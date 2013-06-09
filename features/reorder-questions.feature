Feature: Reorder questions

  As an editor
  I want to reorder questions
  So that I can update the form easily

  Scenario: Drag and drop
    Given I am editing the 'simple contact form'
    When I drag the 'email question' to 'the top'
    Then the 'email question' should be 'first in the form'
