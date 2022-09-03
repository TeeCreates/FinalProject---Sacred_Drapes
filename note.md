dependecies added in client
yarn add styled-components react-router-dom@5.3.0

#### issues

# 1

Whenever I click the home, about or calender in the nav bar, my url changes but not the actual page. I need to refresh to get the components.

solution: I removed the 5.3 veriosn of react-router-dom and added the version 5th version

# 2

My batchimport wasn't working

solution: had to move the env file from the batchimport folder to outside the batchimport folder

# 3

My server wouldn't work, and the insomnia didn't connect

solution: Since I copied the format from my previous project for the server file for the initial set up, I didn't realize i had the uuid there without adding it as a dependency.

LOGIN NOTES
Day 78 Final Project Auth0 authentication video recording
@ 21:45 SERHII EXPLAINS HOW TO CUSTOMIZE THE LOGIN

HATCHFUL.SHOPIFY.COM (USE THIS FOR LOGOS)
