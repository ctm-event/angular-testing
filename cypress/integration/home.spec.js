describe('Home Page', () => {
  it('should display a list of courses', () => {
    cy.fixture('courses.json').as('courseJSON');
    cy.server();
    cy.route('/api/courses', '@courseJSON').as('courses');
    cy.visit('/');
    cy.contains('All Courses');
    cy.wait('@courses');
    cy.get('mat-card').should('have.length', 9);
  })

  it('should display the advanced courses', () => {
    cy.get('.mat-mdc-tab').last().click();
    const advancedCourse = cy.get('.mat-mdc-tab-body-active').get('mat-card');
    advancedCourse.should('have.length', 3);
    advancedCourse.first().should('contain', 'Angular Security Course');
  })
})