# Week X — Clean Up

# THE FOLLOWING CONTENT IS THE FINAL UPDATES MADE TO THE APPLICATION

1. **SQL Script (Backend-Flask)** (seed data manually by running bash script).
*  This script inserts user data into the users table and related activities into the activities table, establishing a relationship between the two tables using the UUID of each user.
*  [Link to Seed SQL Script](https://github.com/jess-bk/aws-bootcamp-cruddur-2023/blob/main/backend-flask/db/seed.sql)
*  [Link to Bash Script](https://github.com/jess-bk/aws-bootcamp-cruddur-2023/blob/main/bin/db/seed)

2. **ShowActivity (Backend-Flask)**.
*  The code defines a class ShowActivity with a method run that retrieves information about a specific activity using a predefined SQL template from a custom database module (db). The result of the query is        returned as a JSON object.
*  [Link to show_activity.py file](https://github.com/jess-bk/aws-bootcamp-cruddur-2023/blob/main/backend-flask/services/show_activity.py)

3. **ActivityItem.js (Frontend React.JS)**.
*  Updates includes the navigation functionality using react-router-dom, allowing the activity_item div to be clickable and navigate to a specific URL. It also omits the replies functionality present in the        first snippet.
*  [Link to ActivityItem.js](https://github.com/jess-bk/aws-bootcamp-cruddur-2023/blob/main/frontend-react-js/src/components/ActivityItem.js)
*  CSS file was updated to reflect the changes made in ActivityItem.js.
*  [Link to ActivityItem.js CSS File](https://github.com/jess-bk/aws-bootcamp-cruddur-2023/blob/main/frontend-react-js/src/components/ActivityItem.css)

4.  **Created New Component Replies.js (Frontend React.JS)**.
*  The Replies component is responsible for rendering a collection of ActivityItem components based on the props.replies array. If there are no replies (props.replies.length is 0), it displays a message            indicating that there is nothing to see yet. Otherwise, it renders the ActivityItem components. The CSS for the component is imported from the 'Replies.css' file.
*  [Link to Replies.js](https://github.com/jess-bk/aws-bootcamp-cruddur-2023/blob/main/frontend-react-js/src/components/Replies.js)

5.  **Created New Component Requests.js Functions For Making HTTP Requests (Frontend React.JS)**.
*   This code provides a simple abstraction for making HTTP requests and handling responses. It supports authentication by adding an access token to the request headers when specified. The exported functions         make it easier to perform common HTTP methods such as POST, PUT, GET, and DELETE.
*   **Request Function:** 
*   The request function is an async function that takes four parameters: method, url, payload_data, and options. It is responsible for making the actual HTTP request.
*   It first checks if the options object has a property named setErrors. If it does, it sets its value to an empty string.
*   Next, it creates an object named attrs that holds the HTTP request attributes like method, headers, and potentially body.
*   If the options object has a property named auth and its value is true, it calls the getAccessToken function. This function likely retrieves an access token and stores it in the local storage. The access         token is then added to the request headers.
*   If the method is not "GET", the payload_data is converted to JSON and assigned to the attrs.body property.
*   The fetch function is then called with the provided url and attrs object. The response is stored in the res variable, and the JSON response data is stored in the data variable.
*   If the response status is 200 (indicating a successful request), the options.success function is called with the response data.
*   If the response status is not 200, the options.setErrors function is called with the response data. Additionally, the response and data are logged to the console.
*   **HTTP Request Functions:**
*   Four functions are exported from the module: post, put, get, and destroy.
*   These functions are convenience wrappers around the request function, making it easier to perform common HTTP methods.
*   The post function calls the request function with the "POST" method.
*   The put function calls the request function with the "PUT" method.
*   The get function calls the request function with the "GET" method.
*   The destroy function (often used for DELETE requests) calls the request function with the "DELETE" method.
*   [Link to Requests.js](https://github.com/jess-bk/aws-bootcamp-cruddur-2023/blob/main/frontend-react-js/src/lib/Requests.js)

6.  **Request.js Updated Made In The Application (Frontend React.JS)**.
*   ReplyForm.js: [Link to ActivityContent.js](https://github.com/jess-bk/aws-bootcamp-cruddur-2023/blob/main/frontend-react-js/src/components/ReplyForm.js)
*   MessageForm.js: [Link to MessageForm.js](https://github.com/jess-bk/aws-bootcamp-cruddur-2023/blob/main/frontend-react-js/src/components/MessageForm.js)
*   ActivityForm.js: [Link to ActivityForm.js](https://github.com/jess-bk/aws-bootcamp-cruddur-2023/blob/main/frontend-react-js/src/components/ActivityForm.js)
*   ProfileForm.js: [Link to ProfileForm.js](https://github.com/jess-bk/aws-bootcamp-cruddur-2023/blob/main/frontend-react-js/src/components/ProfileForm.js)
*   HomeFeedPage.js: [Link to HomeFeedPage.js](https://github.com/jess-bk/aws-bootcamp-cruddur-2023/blob/main/frontend-react-js/src/pages/HomeFeedPage.js)
*   NotificationsFeedPage.js: [Link to NotificationsFeedPage.js](https://github.com/jess-bk/aws-bootcamp-cruddur-2023/blob/main/frontend-react-js/src/pages/NotificationsFeedPage.js)
*   MessageGroupPage.js: [Link to MessageGroupPage.js](https://github.com/jess-bk/aws-bootcamp-cruddur-2023/blob/main/frontend-react-js/src/pages/MessageGroupPage.js)
*   MessageGroupsPage.js: [Link to MessageGroupsPage.js](https://github.com/jess-bk/aws-bootcamp-cruddur-2023/blob/main/frontend-react-js/src/pages/MessageGroupsPage.js)
*   MessageGroupNewPage.js: [Link to MessageGroupNewPage.js](https://github.com/jess-bk/aws-bootcamp-cruddur-2023/blob/main/frontend-react-js/src/pages/MessageGroupNewPage.js)
*   UserFeedPage.js: [Link to UserFeedPage.js](https://github.com/jess-bk/aws-bootcamp-cruddur-2023/blob/main/frontend-react-js/src/pages/UserFeedPage.js)
*   ActivityShowPage.js: [Link to ActivityShowPage.js](https://github.com/jess-bk/aws-bootcamp-cruddur-2023/blob/main/frontend-react-js/src/pages/ActivityShowPage.js)

7.  **Created Component ActivityShowPage.js Added Request.js (Frontend React.JS)**.
*   The ActivityShowPage component fetches and displays a specific activity along with its replies. It provides forms to create new activities and replies. The component also includes navigation and sidebar         components for the overall page layout.
*   The component defines an loadData function that makes an HTTP GET request to fetch activity data and replies from the backend API.
*   The loadData function is called within the useEffect hook when the component mounts.
*   The fetched activity and replies are stored in the component state variables using the setActivity and setReplies functions.
*   The ActivityForm, ReplyForm, and Replies components are passed appropriate props, including state variables and functions to handle interactions.
*   [Link to ActivityShowPage.js](https://github.com/jess-bk/aws-bootcamp-cruddur-2023/blob/main/frontend-react-js/src/pages/ActivityShowPage.js)

8.  **Fixed Time And Date DateTimeFormats.js (Frontend React.JS)**.
*   Updated the seed file by adding by updating "current_timestamp 0 interval '10 day'"
*   format_datetime(value): This function takes a date/time value, converts it to a Luxon DateTime object, and formats it as a localized string representation of the full date and time.
*   message_time_ago(value): This function calculates the time difference between a given value and the current time. It returns a string indicating the time elapsed since the given value, such as "2h" for 2         hours ago, "5m" for 5 minutes ago, or "Oct 15" for a date more than 24 hours ago.
*   time_ago(value): This function is similar to message_time_ago, but it provides a more general time ago representation without any specific context. It calculates the time difference between a given value and     the current time and returns a string indicating the elapsed time, such as "2h" for 2 hours ago, "5m" for 5 minutes ago, or "3d" for 3 days ago.
*   time_future(value): This function calculates the time difference between the current time and a given future value. It returns a string indicating the remaining time until the future value, such as "2h" for     2 hours remaining, "5m" for 5 minutes remaining, or "3d" for 3 days remaining
*   [Link to DateTimeFormats.js](https://github.com/jess-bk/aws-bootcamp-cruddur-2023/blob/main/frontend-react-js/src/lib/DateTimeFormats.js)

9.  **Update Time And Date To Following Components In Application (Frontend React.JS)**.
*   ActivityContent.js: [Link to ActivityContent.js](https://github.com/jess-bk/aws-bootcamp-cruddur-2023/blob/main/frontend-react-js/src/components/ActivityContent.js)
*   ActivityShowItem.js: [Link to ActivityShowItem.js](https://github.com/jess-bk/aws-bootcamp-cruddur-2023/blob/main/frontend-react-js/src/components/ActivityShowItem.js)
*   MessageItem.js: [Link to MessageItem.js](https://github.com/jess-bk/aws-bootcamp-cruddur-2023/blob/main/frontend-react-js/src/components/MessageItem.js)
*   MessageGroupItem.js [Link to MessageGroupItem.js](https://github.com/jess-bk/aws-bootcamp-cruddur-2023/blob/main/frontend-react-js/src/components/MessageGroupItem.js)

10. **Created Component ActivityShowItem.js (Frontend React.JS)**.
*   The component imports CSS styles from a separate file (ActivityItem.css).
*   The component imports several child components related to different actions on the activity, such as replying, reposting, liking, and sharing.
*   The component imports the Link component from React Router for creating links.
*   The component imports utility functions for formatting date and time from a file called DateTimeFormats.
*   The component defines the ActivityShowItem function component that renders the activity item's content and actions.
*   The component uses the imported child components (ActivityActionReply, ActivityActionRepost, ActivityActionLike, ActivityActionShare) to render the specific actions related to the activity.
*   The component renders the activity item's main content, including the user avatar, display name, handle, creation time, expiration time, and message.
*   The component renders the expanded metadata of the activity, including the creation time.
*   The component renders the activity actions section, which contains buttons or icons for replying, reposting, liking, and sharing the activity.
*   [Link to ActivityShowItem.js](https://github.com/jess-bk/aws-bootcamp-cruddur-2023/blob/main/frontend-react-js/src/components/ActivityShowItem.js)

11. **ActivityItem.js Updated With Three 0perations (Frontend React.JS)**.
*   **Delete Operation:** The line {expanded_meta} is being deleted. It appears that expanded_meta is a variable or JSX element that was previously defined and rendered somewhere in the code. However, in this       code block, the line containing {expanded_meta} is being removed, meaning that the expanded_meta element will no longer be included in the component's rendering.
*   **First Add Operation:** The code block adds a new variable called attrs and initializes it as an empty object. This object is used to store attributes that will be assigned to the rendered HTML element.
    Next, an if condition checks whether props.expanded is true. If it is, the className attribute of attrs is set to 'activity_item expanded'. This means that when props.expanded is true, the rendered HTML         element will have the class name 'activity_item expanded'. This is likely used to apply specific styling to the element when it is expanded.
*   **Second Add Operation:** Another if condition checks whether props.expanded is true. If it is, the className attribute of attrs is set to 'activity_item expanded'. If props.expanded is not true, the             className attribute of attrs is set to 'activity_item clickable'. Additionally, the onClick attribute is assigned the value of the click function. This means that when the element is clicked, the click           function will be triggered. 
*   The code block involve adding the attrs object to store attributes and conditionally assigning values to the className and onClick attributes based on the value of props.expanded.
*   [Link to ActivityItem.js](https://github.com/jess-bk/aws-bootcamp-cruddur-2023/blob/main/frontend-react-js/src/components/ActivityItem.js)
