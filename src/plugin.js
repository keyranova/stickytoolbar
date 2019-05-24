const plugin = (editor) => {
  const offset = editor.settings.sticky_offset ? editor.settings.sticky_offset : 0;

  editor.on('init', () => {
    setTimeout(() => {
      setSticky();
    }, 0);
  });

  window.addEventListener('resize', () => {
    setSticky();
  });

  window.addEventListener('scroll', () => {
    setSticky();
  });

  function setSticky() {
    const container = editor.getContainer();

    const toolbars = container.querySelectorAll('.tox-menubar, .tox-toolbar');
    let toolbarHeights = 0;
    toolbars.forEach(toolbar => {
      toolbarHeights += toolbar.offsetHeight;
    });

    if (!editor.inline && container && container.offsetParent) {
      let statusbar = '';

      if (editor.settings.statusbar !== false) {
        statusbar = container.querySelector('.tox-statusbar');
      }

      if (isSticky()) {
        container.style.paddingTop = `${toolbarHeights}px`;

        if (isAtBottom()) {
          let nextToolbarHeight = 0;

          const toolbarsArray = [].slice.call(toolbars).reverse();

          toolbarsArray.forEach(toolbar => {
            toolbar.style.top = null;
            toolbar.style.width = '100%';
            toolbar.style.position = 'absolute';
            toolbar.style.bottom = statusbar ? `${statusbar.offsetHeight + nextToolbarHeight}px` : 0;
            toolbar.style.zIndex = 1;

            nextToolbarHeight = toolbar.offsetHeight;
          });
        } else {
          let prevToolbarHeight = 0;

          toolbars.forEach(toolbar => {
            toolbar.style.bottom = null;
            toolbar.style.top = `${offset + prevToolbarHeight}px`;
            toolbar.style.position = 'fixed';
            toolbar.style.width = `${container.clientWidth}px`;
            toolbar.style.zIndex = 1;

            prevToolbarHeight = toolbar.offsetHeight;
          });
        }
      } else {
        container.style.paddingTop = 0;

        toolbars.forEach(toolbar => {
          toolbar.style = null;
        });
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
    const container = editor.getContainer();

    const editorPosition = container.getBoundingClientRect().top,
      statusbar = container.querySelector('.tox-statusbar'),
      toolbars = container.querySelectorAll('.tox-menubar, .tox-toolbar');

    const statusbarHeight = statusbar ? statusbar.offsetHeight : 0;

    let toolbarHeights = 0;
    toolbars.forEach(toolbar => {
      toolbarHeights += toolbar.offsetHeight;
    });

    const stickyHeight = -(container.offsetHeight - toolbarHeights - statusbarHeight);

    if (editorPosition < stickyHeight + offset) {
      return true;
    }

    return false;
  }
};

export default plugin;
