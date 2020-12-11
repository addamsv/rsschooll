export default class Footer {
  // constructor() {
  //   this.createFooter();
  // }

  createFooter() {
    console.log('footer');
    const FOOTER = document.createElement('footer');
    FOOTER.className = 'footer';
    const LOGO = document.createElement('a');
    LOGO.className = 'logo';
    LOGO.href = 'https://rs.school/js/';

    const LOGO_IMG = document.createElement('img');
    LOGO_IMG.src = './../images/logo.png';
    LOGO_IMG.alt = 'RSS';
    LOGO.append(LOGO_IMG);
    FOOTER.append(LOGO);

    const YEAR = document.createElement('div');
    YEAR.className = 'year';
    YEAR.textContent = '2020';
    FOOTER.append(YEAR);

    const GIT_LINKS = document.createElement('div');
    GIT_LINKS.className = 'git-link';

    const LINK_1 = this.createLink('Elizaveta', 'https://github.com/ElizavetaPanasiuk?tab=repositories');
    const LINK_2 = this.createLink('Sergey', 'https://github.com/addamsv');

    GIT_LINKS.append(LINK_1);
    GIT_LINKS.append(LINK_2);

    FOOTER.append(GIT_LINKS);

    document.body.append(FOOTER);
  }

  createHeader() {
    return '';
  }

  createLink(name, link) {
    const LINK = document.createElement('div');
    LINK.className = 'link';
    LINK.href = link;
    const LINK_IMG = document.createElement('img');
    LINK_IMG.src = './../images/github-logo.png';
    LINK.append(LINK_IMG);
    return LINK;
  }
}