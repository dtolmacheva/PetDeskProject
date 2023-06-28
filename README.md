# petdesk-project

A simple dashboard that

- shows requested appointments for the veterinarians
- allows veterinarians to confirm the appointment
- allows veterinarians to select an alternate date for appointment

## Getting Started

Note: this app was written with the following versions:
npm: 9.6.7
node: v18.16.0
.net core: 7.0.2
react: 18.2

1. Clone the repo with the project into a local directory

2. Make sure the IDE env is set up with .Net Core & React (I used VS Code). And all the npm/node versions are up to date.

3. Open the project in the configured IDE

4. Make sure you have the following node-modules installed:
   npm install react-icons
   npm install react-dropdown --save
   npm install react-datetime-picker

   - to fix invalid multiple hooks error due to different versions of react run:
     npm link ./ClientApp/node_modules/react ./ClientApp/node_modules/react-dom

5. Run the project locally (I used .NET Core Launch (web) in VSCode)

### Key Assumptions

1. There is no relationship between confirmation and updating appointment date

2. Suggesting alternate date updates the appointment requested date

3. Any user can see any appointment and details as well as updating them

4. There can be overlapping appointments due to limited information

5. The appointment data is meant to be stored in a DB/server
