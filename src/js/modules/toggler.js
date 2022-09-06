export const initTogglers = () => {
    const togglers = document.querySelectorAll('[data-toggler]');
    const switchClass = (scrollLock, togglerEl, targetEl, switchableClass) => {
        const isActive = targetEl.classList.contains(switchableClass);
        const scrollLockClass = scrollLock && 'scroll-lock';
        if (!isActive) {
            const top = document.documentElement.scrollTop;
            targetEl.classList.add(switchableClass);
            togglerEl.classList.add('toggler--close');
            document.body.setAttribute('data-scroll', top.toString());
            setTimeout(() => {
                document.body.classList.add(scrollLockClass);
            }, 200);
        }
        else {
            document.body.classList.remove(scrollLockClass);
            const scrollPos = document.body.getAttribute('data-scroll');
            window.scrollTo({ top: Number(scrollPos) });
            targetEl.classList.remove(switchableClass);
            togglerEl.classList.remove('toggler--close');
        }
    };
    const initToggler = (e) => {
        const target = e.target.closest('[data-toggler]');
        if (!target) {
            return;
        }
        const targetId = target.dataset.targetId;
        const targetEl = document.querySelector(`#${targetId}`);
        const switchableClass = target.dataset.targetClassToggle;
        const lockScrolling = target.dataset.scrollLock;
        const breakpoint = target.dataset.breakpoint;
        if (!targetEl) {
            return;
        }
        switchClass(lockScrolling, target, targetEl, switchableClass);
        if (lockScrolling) {
            window.addEventListener('resize', () => {
                if (window.matchMedia(`(min-width: ${breakpoint ?? 768}px)`).matches) {
                    targetEl.classList.remove(switchableClass);
                    target.classList.remove('toggler--close');
                    document.body.classList.remove('scroll-lock');
                }
            });
        }
    };
    togglers.forEach(toggler => {
        toggler.addEventListener('click', initToggler);
    });
};
