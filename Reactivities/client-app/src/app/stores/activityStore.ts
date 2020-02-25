import { observable, action, computed } from "mobx";
import { createContext, SyntheticEvent } from "react";
import { IActivity } from "../models/activity";
import agent from "../api/agent";

class ActivityStore {
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

      activities.forEach(a => {
        a.date = a.date.split(".")[0];
        this.activityRegistry.set(a.id, a);
      });

      this.loadingInitial = false;
    } catch (error) {
      this.loadingInitial = false;
      console.log(error);
    }
  };

  @action createActivity = async (activity: IActivity) => {
    try {
      this.submitting = true;

      await agent.Activities.create(activity);

      this.activityRegistry.set(activity.id, activity);

      this.editMode = false;
    } catch (error) {
      console.log(error);
    } finally {
        this.submitting = false;
    }
  };

  @action editActivity = async (activity: IActivity) => {
    try {
      this.submitting = true;

      await agent.Activities.update(activity);

      this.activityRegistry.set(activity.id, activity);
      this.selectedActivity = activity;
      this.editMode = false;
    } catch (error) {
      console.log(error);
    } finally {
        this.submitting = false;
    }
  };

  @action deleteActivity = async (event: SyntheticEvent<HTMLButtonElement>, id: string) => {
      try {
        this.submitting = true;
        this.target = event.currentTarget.name;
        await agent.Activities.delete(id);
        this.activityRegistry.delete(id);
      } catch (error) {
        console.log(error);
      } finally {
        this.submitting = false;
        this.target = "";
      }
  }

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
  }

  @action cancelFormOpen = () => {
    this.editMode = false;
  }
}

export default createContext(new ActivityStore());
