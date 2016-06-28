# Created by Nem at 2/21/16
@guidebox
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

  @rest_api
  Scenario: This test is to ensure the content API is working correctly
    When we make a get request /api/content/

  @rest_api
  Scenario: This test is to ensure the services API is working correctly
    When we make a get request /api/services/

  @rest_api
  Scenario: This test is to ensure the hardware API is working correctly
    When we make a get request /api/hardware/

  @guidebox
  Scenario: This is to test the netflixable class to ensure that it grabs and saves shows on netflix
    Given  and instance of Netflixable with http://usa.netflixable.com/2016/01/complete-alphabetical-list-wed-jan-27.html
    When We make call the netflixable url
    And we make soup out of those shows
    And we find the show Orange is the New Black in the soup
    When we call the specific page for the show
    And we check the database for the show and add netflix
    And we do a search by show title on guidebox if the show isn't int the database
    Then we save that show and add netflix
#    Then we find "Orange is the New Black" in the fuzzy search from guidebox
    Then Orange Is the New Black has the netflix channel

  Scenario: This is to test the process shows method of the Netflixable class
    Given  and instance of Netflixable with http://usa.netflixable.com/2016/01/complete-alphabetical-list-wed-jan-27.html
    And we get a list of shows
    When we call process shows
    Then we see shows on netflix

  @rest_api
  @real_db
  Scenario: Test for addding sling to a show
    Given a search term the walking dead
    When we search queryset for the walking dead
    Then the suggestions on_sling is true
    # Enter steps here

  @rest_api
  @real_db
  Scenario: Test for addding sling to a show
    Given a search term scandal
    When we search queryset for scandal
    Then the suggestions is_over_the_air is true
    # Enter steps here

  @rest_api
  Scenario: Testing the channel images endpoint
    Given and id of 147
    When we query the api for channel images
    Then we get image json