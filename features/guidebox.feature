# Created by Nem at 7/24/15

@guidebox
Feature: guidebox api feature
  this is to test functionaity that pulls shows and providers from the guidbox api

#  Scenario: Grabbing a list of shows from guidebox
#    Given an index
#    When get_shows is called
#    Then json is returned

  Scenario: Getting a list of content from the guidebox api and saving the content
    Given an index of 0
    When a list of content is requested from guidebox
    Then json is returned
    Then we save the content list

