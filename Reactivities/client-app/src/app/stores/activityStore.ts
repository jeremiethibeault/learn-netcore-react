import { observable, action, computed, configure, runInAction } from "mobx";
import { createContext, SyntheticEvent } from "react";
import { IActivity } from "../models/activity";
import agent from "../api/agent";

configure({ enforceActions: "always" });

export class ActivityStore {
  @observable activityRegistry = new Map();
  @observable activities: IActivity[] = [];
  @observable selectedActivity: IActivity | undefined = undefined;
  @observable loadingInitial = false;
  @observable editMode = false;
  @observable submitting = false;
  @observable target = "";

  @computed get activitiesByDate() {
    return Array.from(this.activityRegistry.values()).sort(
      (a, b) => Date.parse(a.date) - Date.parse(b.date)
    );
  }

  @action loadActivities = async () => {
    try {
      this.loadingInitial = true;
      const activities = await agent.Activities.list();

      runInAction(() => {
        activities.forEach(a => {
          a.date = a.date.split(".")[0];
          this.activityRegistry.set(a.id, a);
        });
      });
    } catch (error) {
      console.log(error);
    } finally {
      runInAction(() => {
        this.loadingInitial = false;
      });
    }
  };

  @action createActivity = async (activity: IActivity) => {
    try {
      this.submitting = true;

      await agent.Activities.create(activity);

      runInAction(() => {
        this.activityRegistry.set(activity.id, activity);
        this.editMode = false;
      });
    } catch (error) {
      console.log(error);
    } finally {
      runInAction(() => {
        this.submitting = false;
      });
    }
  };

  @action editActivity = async (activity: IActivity) => {
    try {
      this.submitting = true;

      await agent.Activities.update(activity);

      runInAction(() => {
        this.activityRegistry.set(activity.id, activity);
        this.selectedActivity = activity;
        this.editMode = false;
      });
    } catch (error) {
      console.log(error);
    } finally {
      runInAction(() => {
        this.submitting = false;
      });
    }
  };

  @action deleteActivity = async (
    event: SyntheticEvent<HTMLButtonElement>,
    id: string
  ) => {
    try {
      this.submitting = true;
      this.target = event.currentTarget.name;
      
      await agent.Activities.delete(id);

      runInAction(() => {
        this.activityRegistry.delete(id);
      });
    } catch (error) {
      console.log(error);
    } finally {
      runInAction(() => {
        this.submitting = false;
        this.target = "";
      });
    }
  };

  @action selectActivity = (id: string) => {
    this.selectedActivity = this.activityRegistry.get(id);
    this.editMode = false;
  };

  @action openCreateForm = () => {
    this.editMode = true;
    this.selectedActivity = undefined;
  };

  @action openEditForm = (id: string) => {
    this.selectedActivity = this.activityRegistry.get(id);
    this.editMode = true;
  };

  @action cancelSelectedActivity = () => {
    this.selectedActivity = undefined;
  };

  @action cancelFormOpen = () => {
    this.editMode = false;
  };
}

export default createContext(new ActivityStore());
