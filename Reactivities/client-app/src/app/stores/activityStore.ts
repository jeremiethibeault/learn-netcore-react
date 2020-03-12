import { observable, action, computed, configure, runInAction } from "mobx";
import { createContext, SyntheticEvent } from "react";
import { IActivity } from "../models/activity";
import agent from "../api/agent";

configure({ enforceActions: "always" });

export class ActivityStore {
  @observable activityRegistry = new Map();
  @observable activity: IActivity | null = null;
  @observable loadingInitial = false;
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
        this.loadingInitial = false;
      });
    } catch (error) {
      console.log(error);
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
        this.submitting = false;
      });
    } catch (error) {
      console.log(error);
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
        this.activity = activity;
        this.submitting = false;
      });
    } catch (error) {
      console.log(error);
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
        this.submitting = false;
        this.target = "";
      });
    } catch (error) {
      console.log(error);
      runInAction(() => {
        this.submitting = false;
        this.target = "";
      });
    }
  };

  @action loadActivity =  async (id: string) => {
    let activity = this.getActivity(id);

    if (activity) {
      this.activity = activity;
    } else {
      try {
        this.loadingInitial = true;
        activity = await agent.Activities.details(id);

        runInAction(() => {
          this.activity = activity;
          this.loadingInitial = false;
        });
      } catch (error) {
        console.log(error);
        runInAction(() => {
          this.loadingInitial = false;
        });
      }
    }
  }

  getActivity = (id: string) => {
    return this.activityRegistry.get(id);
  }

  @action clearActivity = () => {
    this.activity = null;
  }
}

export default createContext(new ActivityStore());
