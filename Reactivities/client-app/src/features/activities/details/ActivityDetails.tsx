import React, { useContext, useEffect } from "react";
import { Card, Image, Button, Grid } from "semantic-ui-react";
import { observer } from "mobx-react-lite";
import { RouteComponentProps, Link } from "react-router-dom";
import ActivityStore from "../../../app/stores/activityStore";
import LoadingComponent from "../../../app/layout/LoadingComponent";
import ActivityDetailsHeader from "./ActivityDetailsHeader";
import ActivityDetailsInfo from "./ActivityDetailsInfo";
import ActivityDetailsChat from "./ActivityDetailsChat";
import ActivityDetailsSidebar from "./ActivityDetailsSidebar";

interface DetailsParams {
  id: string;
}

const ActivityDetails: React.FC<RouteComponentProps<DetailsParams>> = ({
  match,
  history
}) => {
  const activityStore = useContext(ActivityStore);

  const { activity, loadActivity, loadingInitial } = activityStore;

  useEffect(() => {
    loadActivity(match.params.id).then(() => console.log("A"));
  }, [loadActivity, match.params.id]);

  if (loadingInitial || !activity)
    return <LoadingComponent content="Loading activity..." />;

  return (
    <Grid>
      <Grid.Column width="10">
        <ActivityDetailsHeader activity={activity} />
        <ActivityDetailsInfo activity={activity} />
        <ActivityDetailsChat />
      </Grid.Column>
      <Grid.Column width="6">
        <ActivityDetailsSidebar />
      </Grid.Column>
    </Grid>
  );
};

export default observer(ActivityDetails);
