// - 목록페이지에는 10개의 목록이 노출됩니다.
// - 목록페이지에서 아래 2페이지를 누르면 다음 페이지 목록이 노출됩니다.
// - 목록페이지에서 목록 아이템을 누르면 상세페이지로 이동합니다.
// - 목록페이지에서 공지사항 목록 추가 버튼을 누르면 공지사항 추가 페이지로 이동합니다.

// - 추가페이지는 제목에 빈 값을 넣으면 "공지사항 제목을 입력해주세요" 토스트를 노출합니다.
// - 추가페이지는 내용에 빈 값을 넣으면 "공지사항 내용을 입력해주세요" 토스트를 노출합니다.
// - 추가페이지에서 제목과 내용을 입력 후 공지사항 추가 버튼을 누르면 '반영되었습니다.' 내용의 토스트가 노출되고 확인을 누르면 목록으로 이동합니다.

// - 상세페이지는 제목과 내용이 존재하며 필수 값입니다.
// - 상세페이지에서 공지사항 삭제 버튼을 누르면 '공지사항을 삭제하시겠습니까?'내용의 팝업이 노출되고 확인을 누르면 '반영되었습니다.' 토스트 노출 후 목록으로 이동합니다.
// - 상세페이지에서 공지사항 수정 버튼을 누르면 '공지사항 목록으로 이동하시겠습니까?' 내용을 팝업이 노출되고 확인을 누르면 저장 후 목록으로 이동합니다.

describe('공지사항 목록 페이지', () => {
  beforeEach(() => {
    // given
    cy.login(Cypress.env('ADMIN_EMAIL'), Cypress.env('ADMIN_PASSWORD'));
    cy.visit('http://localhost:3000/services/announces');
  });

  it('목록페이지에는 10개의 목록이 노출됩니다.', () => {
    // when + then
    cy.get('.ant-table-tbody tr').should('have.length', 10);
  });

  it('목록페이지에서 아래 2페이지를 누르면 다음 페이지 목록이 노출됩니다.', () => {
    // when
    cy.contains('li', '2').click();
    // then
    cy.get('.ant-table-tbody tr').should('have.length', 10);
  });

  it('목록페이지에서 목록 아이템을 누르면 상세페이지로 이동합니다.', () => {
    // when
    cy.get('.ant-table-tbody tr').first().click();
    // then
    cy.url().should('include', '/services/announces/22');
  });

  it('목록페이지에서 공지사항목록 추가 버튼을 누르면 공지사항 추가 페이지로 이동합니다.', () => {
    // when
    cy.contains('button', '공지사항목록 추가').click();
    // then
    cy.url().should('include', '/services/announces/create');
  });
});

describe('공지사항 추가 페이지', () => {
  beforeEach(() => {
    // given
    cy.login(Cypress.env('ADMIN_EMAIL'), Cypress.env('ADMIN_PASSWORD'));
    cy.visit('http://localhost:3000/services/announces/create');
  });

  it('추가페이지는 제목에 빈 값을 넣으면 "공지사항 제목을 입력해주세요" 토스트를 노출합니다.', () => {
    // when
    cy.get('[data-testid=input-title]').clear();
    cy.contains('button', '공지사항 추가').click();

    // then
    cy.contains('.ant-message-notice-content', '공지사항 제목을 입력해주세요');
  });

  it('추가페이지는 내용에 빈 값을 넣으면 "공지사항 내용을 입력해주세요" 토스트를 노출합니다.', () => {
    // when
    cy.get('[data-testid=input-title]').type('테스트 공지사항 제목');
    cy.get('[data-testid=input-content]').clear();
    cy.contains('button', '공지사항 추가').click();

    // then
    cy.contains('.ant-message-notice-content', '공지사항 내용을 입력해주세요');
  });

  it('추가페이지에서 제목과 내용을 입력 후 공지사항 추가 버튼을 누르면 "반영되었습니다."내용의 팝업이 노출되고 확인을 누르면 목록으로 이동합니다.', () => {
    // when
    cy.get('[data-testid=input-title]').type('테스트 공지사항 제목');
    cy.get('[data-testid=input-content]').type('테스트 공지사항 내용');

    // then
    cy.on('window:alert', (str) => {
      expect(str).to.equal('반영되었습니다.');
    });
    cy.contains('button', '공지사항 추가').click();
    cy.url().should('eq', 'http://localhost:3000/services/announces');
  });
});

describe('공지사항 상세 페이지', () => {
  beforeEach(() => {
    // given
    cy.login(Cypress.env('ADMIN_EMAIL'), Cypress.env('ADMIN_PASSWORD'));
    cy.visit('http://localhost:3000/services/announces/27');
  });

  it('상세페이지에서 제목에 빈 값을 넣으면 "공지사항 제목을 입력해주세요" 토스트를 노출합니다.', () => {
    // when
    cy.get('[data-testid=input-title]').clear();
    cy.contains('button', '공지사항 수정').click();
    cy.on('window:confirm', () => false);

    // then
    cy.contains('.ant-message-notice-content', '공지사항 제목을 입력해주세요');
  });

  it('상세페이지에서 내용에 빈 값을 넣으면 "공지사항 내용을 입력해주세요" 토스트를 노출합니다.', () => {
    // when
    cy.get('[data-testid=input-content]').clear();
    cy.contains('button', '공지사항 수정').click();
    cy.on('window:confirm', () => false);

    // then
    cy.contains('.ant-message-notice-content', '공지사항 내용을 입력해주세요');
  });

  it('상세페이지에서 공지사항 수정 버튼을 누르면 "공지사항 목록으로 이동하시겠습니까?" 내용을 팝업이 노출되고 확인을 누르면 저장 후 목록으로 이동합니다.', () => {
    // when
    cy.get('[data-testid=input-title]').type('테스트 공지사항 제목');
    cy.get('[data-testid=input-content]').type('테스트 공지사항 내용');
    cy.contains('button', '공지사항 수정').click();
    cy.on('window:confirm', () => true);

    // then
    cy.url().should('eq', 'http://localhost:3000/services/announces');
    cy.contains('.ant-message-notice-content', '반영되었습니다.');
  });

  it('상세페이지에서 공지사항 삭제 버튼을 누르면 "공지사항을 삭제하시겠습니까?" 내용의 팝업이 노출되고 확인을 누르면 "반영되었습니다." 토스트 노출 후 목록으로 이동합니다.', () => {
    // when
    cy.contains('button', '공지사항 삭제').click();
    cy.on('window:confirm', () => true);

    // then
    cy.url().should('eq', 'http://localhost:3000/services/announces');
    cy.contains('.ant-message-notice-content', '반영되었습니다.');
  });
});
