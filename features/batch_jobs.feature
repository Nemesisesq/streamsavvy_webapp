@guidebox
Feature: Batch Job Tests
  These scenarios test the scheduled batch jobs ran to grab data from guidebox

  Scenario: Adding shows to DB after new content request to guidebox
    Given the database is outdated
    When the batch job has been run
    Then the database is updated with new shows

  Scenario: Removing shows to DB after new content request to guidebox
    Given the database is outdated
    When the batch job has been run
    Then the database is updated with removed shows

  Scenario: Updating provider information after new content request to guidebox
    Given the database is outdated
    When the batch job has been run
    Then the database is updated with provider information

  Scenario: Updating Image information after new content request to guidebox
    Given the database is outdated
    When the batch job has been run
    Then the database is updated with new images

  Scenario: Updating Description information after new content request to guidebox
    Given the database is outdated
    When the batch job has been run
    Then the database is updated with new descriptions