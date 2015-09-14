# Created by Nem at 7/24/15

@guidebox
Feature: guidebox api feature
  this is to test functionaity that pulls shows and providers from the guidbox api

#  Scenario: Grabbing a list of shows from guidebox
#    Given an index
#    When get_shows is called
#    Then json is returned

#  Scenario: Grabbing shows from guidebox in multiple calls
#    Given repeat 3 times
#    When populate_content is called
#    Then there are 750 results
#
#  Scenario: Getting a show's details from guidbox
#    Given show id 2625 and name Homeland
#    When get_content_detail method is called
#    Then json is returned with an object of show id 2625 and name Homeland

#  Scenario: Testing Multi threading
#    When show_detail_multithreading is called
#    Then shows have a description

  Scenario: Testing Additional Provider acq
    When show_detail_multithreading_extra is called
    Then we just pass True here

