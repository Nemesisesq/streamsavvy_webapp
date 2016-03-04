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
    Then we save the content

  Scenario: We get a list of channels from the guidebox api and save the channels
    Given an index of 0
    When a list of channels is requested from guidebox
    Then json is returned
    Then we save the channels

  Scenario: We test the task that adds show to the queue to be saved
    Given a total number of shows
    When we call the populate shows task
    Then there are a total number of shows in the queue

  Scenario: We test the task that adds channels to the queue to be saved
    Given a total number of channels
    When we call the populate channel task
    Then there are a total number of channels in the queue


  Scenario: We Test the method that connects shows to channels using guidebox data
    Given a list of channels from the database
    When we process that list
    Then the content now has channels


  Scenario: We test the task that connects shows and channels
    Given a list of channels from the database
    When we call the connect channel to content task
    Then there are a total number of jobs in the queue





