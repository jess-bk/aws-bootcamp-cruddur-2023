import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

function Activities({ handle }) {
  const [activities, setActivities] = useState({});

  const params = useParams();
  console.log("params", params);

  useEffect(() => {
    async function fetchData() {
      const response = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/api/activities/${params.handle}`
      );
      const data = await response.json();
      setActivities(data);
    }

    fetchData();
  }, [handle]);

  return (
    <div>
      <h2>Activities for {handle}</h2>
      <ul>
        {activities.activities?.map((activity) => (
          <>
            <li key={activity._id}>{activity.display_name}</li>
            <li>{activity.created_at}</li>
            <li>{activity.expires_at}</li>
            <li>{activity.handle}</li>
            <li>{activity.uuid}</li>
          </>
        ))}
      </ul>
    </div>
  );
}

export default Activities;
