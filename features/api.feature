# Created by Nem at 2/21/16
Feature: API Fature
  In this feature we test the various view functions of the api

  @rest_api
  Scenario: testing the search API
#    Given a search request for orange
    When we search queryset for orange
    Then we get a list

  Scenario: testing the content has sling
    When we get channel espn
    Then we see that it can be viewed by sling

  @rest_api
  Scenario: We test that Json Package is returned
    Given an unauthenticated user
    When we make a get request /api/package/
    Then we get a blank package

  @rest_api
  Scenario: We test that a Json Package can be posted
    Given an unauthenticated user
    When we make a get request /api/package/
    Then we get a blank package
    And we modify the package
    When we make a post request /api/package/
    Then we update the package


  Scenario: This test is to ensure the content API is working correctly
    When we make a get request /api/content/