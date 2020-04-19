/* eslint-disable func-names */

describe('The index page', function () {
    it('successfully loads and has hero title', function () {
        cy.visit('/');
        cy.contains('Gulp starter kit 2020');
    });
});

/* eslint-enable func-names */
