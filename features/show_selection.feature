# Created by chirag at 8/2/15
Feature: Show Selection functionality#Enter feature name here
  # Enter feature description here

  Scenario: Input Field Suggestions
  Given the application displays the Show Input field
    When the user begins typing
    Then the application suggests possible matching shows

  Scenario: Add a show to list
  Given the application displays the Show Input field
    When the user enters a show
    Then the application displays the new show on the User’s Show List


  Scenario: Remove a show from list
  Given the application displays the User’s Show List
		When the user clicks the delete button by a show
		Then the application removes the show from the User’s Show List


  Scenario: Remove all shows from list
  Given the application displays the User’s Show list
    When the user clicks the clear list button
    Then the application removes all shows from the User’s Show List
