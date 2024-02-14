Feature: Sign up

@positive scenario
Scenario: Successfully sign-up 
Given on Trello sign-up page
When enter a valid "test@gmail.com" email
And click "Continue" button
Then the "Sign up" button is enabled
And click the "Sign up" button
And password field is enabled
And enter a valid password "Test123$"
And click on "Log In" button
Then successfully log in with new account

@negative scenario
Scenario: fail sign-up by wrong email
Given on Trello sign-up page
When email field is enabled
And enter an invalid email "test.gmail.com"
Then "Continue" button is unavailable to click 

Feature: User profile

@positive scenario
Scenario: Edit username
Given on the Account menu
And click on "Profile and visibility"
When the profile user page is enabled
Then enter the new user name "test1"
And click "Save" button
And "Saved" pop-up message is displayed
Then the new username "Test1" should be visible on the header page

@negative scenario
Scenario: fail to edit username
Given on the Account menu
And click on "Profile and visibility"
When the profile user page is enabled
Then enter the new username as "test"
And click the "Save" button
Then a message "username is taken" should displayed

Feature: Card

@positive scenario
Scenario: Create a card
Given on "My Trello board" page
And selecting the list "To do"
When click on "+ add a card" 
Then the "enter a title for this card" field is enabled
And enter the new title "task 1"
And click "Add card" button
Then the new card should be displayed on the list

@positive scenario
Scenario: Add label to a card
Given on "task 1" card page
When click on "Labels" button
Then the labels panel is enabled
And click on "Create a new label" 
And enter "Title 1" in the Title field
And select a color
And click on the "Create" button
Then the "Title 1" label is displayed in the "task 1" card

Feature: Search bar

@positive scenario
Scenario: Search for a board
Given on Trello main page
And enter "My Trello" in the search bar
When the search list is enabled
And click on "My Trello board" 
Then the board "My trello board" page should be open

@negative scenario
Scenario: Search for a Non-Existent board
Given on Trello's main page
When enter "Test 1" in the search bar
Then The message "We couldn't find anything matching your search." should be displayed
