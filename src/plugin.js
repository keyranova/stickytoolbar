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

      let statusbar = '';

      if (editor.settings.statusbar !== false) {
        statusbar = container.querySelector('.mce-statusbar');
      }

      const topPart = container.querySelector('.mce-top-part');

      if (isSticky()) {
        container.style.paddingTop = `${topPart.offsetHeight}px`;

        if (isAtBottom()) {
          topPart.style.top = null;
          topPart.style.width = '100%';
          topPart.style.position = 'absolute';
          topPart.style.bottom = statusbar ? `${statusbar.offsetHeight}px` : 0;
        } else {
          topPart.style.bottom = null;
          topPart.style.top = `${offset}px`;
          topPart.style.position = 'fixed';
          topPart.style.width = `${container.clientWidth}px`;
        }
      } else {
        container.style.paddingTop = 0;

        topPart.style.position = 'relative';
        topPart.style.top = null;
        topPart.style.width = null;
        topPart.style.borderBottom = null;
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
      statusbar = container.querySelector('.mce-statusbar'),
      topPart = container.querySelector('.mce-top-part');

    const statusbarHeight = statusbar ? statusbar.offsetHeight : 0,
      topPartHeight = topPart ? topPart.offsetHeight : 0;

    const stickyHeight = -(container.offsetHeight - topPartHeight - statusbarHeight);

    if (editorPosition < stickyHeight + offset) {
      return true;
    }

    return false;
  }
};

export default plugin;
