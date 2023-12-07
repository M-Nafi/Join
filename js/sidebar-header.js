
/**
 * Checks the current path and activates the corresponding menu link if it matches specific page URLs.
 */
function checkPath() {
  let currentPath = window.location.pathname;

  if (currentPath === '/10_Join/Join/summary.html' || currentPath === '/10_Join/Join/add_task.html' || currentPath === '/10_Join/Join/board.html' || currentPath === '/10_Join/Join/contacts.html') {
      activeMenuLink();
  }
  if (currentPath === '/10_Join/Join/privacy_policy.html' || currentPath === '/10_Join/Join/legal_notice.html') {
    activeInfoLink();
  }

}

/**
 * Activates the menu link that corresponds to the current page.
 */
function activeMenuLink() {
  let urlAsId = window.location.pathname.split('/').pop().split('.html')[0] + '_link';
  document.getElementById(urlAsId).classList.add('sidebar-button-selected');
}

/**
 * Activates the menu link that corresponds to the current page.
 */
function activeInfoLink() {
  let urlAsId = window.location.pathname.split('/').pop().split('.html')[0] + '_link';
  document.getElementById(urlAsId).classList.add('sidebar-privacy-button-selected');
}
