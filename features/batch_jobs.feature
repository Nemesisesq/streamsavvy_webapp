@guidebox

Feature: Batch Job Tests
  These scenarios test the scheduled batch jobs ran to grab data from guidebox

  Scenario: Checking DB status
    When the guidebox date call is run
    Then the streamsavvy db status is updated


  Scenario: Adding shows to DB after new content request to guidebox
    Given the streamsavvy database is outdated
    When the batch job has been run
    Then the streamsavvy database is updated with new shows

  Scenario: Removing shows to DB after new content request to guidebox
    Given the streamsavvy database is outdated
    When the batch job has been run
    Then the streamsavvy database is updated with removed shows

  Scenario: Updating provider information after new content request to guidebox
    Given the streamsavvy database is outdated
    When the batch job has been run
    Then the streamsavvy database is updated with provider information

  Scenario: Updating Image information after new content request to guidebox
    Given the streamsavvy database is outdated
    When the batch job has been run
    Then the streamsavvy database is updated with new images

  Scenario: Updating Description information after new content request to guidebox
    Given the streamsavvy database is outdated
    When the batch job has been run
    Then the streamsavvy database is updated with new descriptions


  Scenario: No changes if up-to-date database
    Given the streamsavvy databse is up to date
    When the batch job has been run
    Then the streamsavvy database is not updated

  Scenario: Batch job returns empty database
    Given the batch job has been run
    #When it's diff file includes removal of all shows and providers
    When the batch job returns an empty show database
    Then the streamsavvy database is not updated

  Scenario: Batch job tries to update existing database with duplicate information
    Given the batch job has been run
    When the batch job returns a duplicate database
    Then the streamsavvy database is not updated





