# Created by Nem at 9/3/15
Feature: describe the behavior of anonymous users
  in order to create two different user journeys there must be an anonymous user that

  Scenario: Test adding AnonymousUser to package as ownder
    Given an anonymous user
    When we have a new package
    Then we can assign the anonymous user as the packages owner