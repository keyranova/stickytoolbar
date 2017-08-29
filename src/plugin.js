const plugin = (editor) => {
  const offset = editor.settings.sticky_offset ? editor.settings.sticky_offset : 0;

  editor.on('init', () => {
    setSticky();
  });

  window.addEventListener('scroll', () => {
    setSticky();
  });

  function setSticky() {
    const container = editor.getContainer();

    if (!editor.inline && container && container.offsetParent) {
      const menubar = container.querySelector('.mce-menubar'),
        statusbar = container.querySelector('.mce-statusbar'),
        toolbar = container.querySelector('.mce-toolbar-grp');

      if (isSticky()) {
        if (menubar) {
          container.style.paddingTop = `${toolbar.offsetHeight + menubar.offsetHeight}px`;
        } else {
          container.style.paddingTop = `${toolbar.offsetHeight}px`;
        }

        if (isAtBottom()) {
          if (menubar) {
            menubar.style.top = null;
            menubar.style.borderBottom = null;

            menubar.style.bottom = `${statusbar.offsetHeight + toolbar.offsetHeight}px`;
            menubar.style.position = 'absolute';
            menubar.style.width = '100%';
          }

          toolbar.style.top = null;
          toolbar.style.borderBottom = null;

          toolbar.style.bottom = `${statusbar.offsetHeight}px`;
          toolbar.style.position = 'absolute';
          toolbar.style.width = '100%';
        } else {
          if (menubar) {
            menubar.style.bottom = null;

            menubar.style.top = `${offset}px`;
            menubar.style.position = 'fixed';
            menubar.style.width = `${container.clientWidth}px`;
            menubar.style.backgroundColor = '#f0f0f0';
          }

          toolbar.style.bottom = null;

          toolbar.style.top = `${menubar ? (menubar.offsetHeight + offset) : offset}px`;
          toolbar.style.position = 'fixed';
          toolbar.style.width = `${container.clientWidth}px`;
          toolbar.style.borderBottom = '1px solid rgba(0, 0, 0, 0.2)';
        }
      } else {
        container.style.paddingTop = 0;

        if (menubar) {
          menubar.style.position = 'relative';
          menubar.style.top = null;
          menubar.style.width = null;
          menubar.style.borderBottom = null;
        }
        toolbar.style.position = 'relative';
        toolbar.style.top = null;
        toolbar.style.width = null;
        toolbar.style.borderBottom = null;
      }
    }
  }

  function isSticky() {
    const editorPosition = editor.getContainer().getBoundingClientRect().top;

    if (editorPosition < offset) {
      return true;
    }

    return false;
  }

  function isAtBottom() {
    const container = editor.getContainer(),
      editorPosition = container.getBoundingClientRect().top,
      menubar = container.querySelector('.mce-menubar');

    const statusbarHeight = container.querySelector('.mce-statusbar').offsetHeight,
      toolbarHeight = container.querySelector('.mce-toolbar-grp').offsetHeight;

    const menubarHeight = menubar ? menubar.offsetHeight : 0;

    const stickyHeight = -(container.offsetHeight - menubarHeight - statusbarHeight - toolbarHeight);

    if (editorPosition < stickyHeight + offset) {
      return true;
    }

    return false;
  }
};

export default plugin;
