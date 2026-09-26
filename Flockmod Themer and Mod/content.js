(() => {
    let customizationsEnabled = true;

    const MOD_BUTTON_SELECTOR = ".themeModMenuButton";
    const MOD_DIALOG_SELECTOR = '.dialog[name="themeModMenu"]';

    function applyFontSizePreview(size) {
        if (size === "small") {
            document.documentElement.style.setProperty(
                "--flockmod-custom-ui-font-size",
                "0.95"
            );
        } else if (size === "large") {
            document.documentElement.style.setProperty(
                "--flockmod-custom-ui-font-size",
                "1.05"
            );
        } else {
            document.documentElement.style.removeProperty(
                "--flockmod-custom-ui-font-size"
            );
        }
    }

    function applyFontWeightPreview(weight) {
        if (weight === "medium") {
            document.documentElement.style.setProperty(
                "--flockmod-custom-ui-font-weight",
                "500"
            );
        } else if (weight === "semibold") {
            document.documentElement.style.setProperty(
                "--flockmod-custom-ui-font-weight",
                "600"
            );
        } else if (weight === "bold") {
            document.documentElement.style.setProperty(
                "--flockmod-custom-ui-font-weight",
                "700"
            );
        } else {
            document.documentElement.style.removeProperty(
                "--flockmod-custom-ui-font-weight"
            );
        }
    }

    function applySavedFont() {
        const savedFont =
            localStorage.getItem("flockmodCustomUIFont") || "default";

        if (
            savedFont !== "default" &&
            customizationsEnabled
        ) {
            document.documentElement.style.setProperty(
                "--flockmod-custom-ui-font",
                `"${savedFont}", sans-serif`
            );
        } else {
            document.documentElement.style.removeProperty(
                "--flockmod-custom-ui-font"
            );
        }
    }

    function applySavedFontSize() {
        const savedFontSize =
            localStorage.getItem("flockmodCustomUIFontSize") || "medium";

        if (customizationsEnabled) {
            applyFontSizePreview(savedFontSize);
        } else {
            document.documentElement.style.removeProperty(
                "--flockmod-custom-ui-font-size"
            );
        }
    }

    function applySavedFontWeight() {
        const savedFontWeight =
            localStorage.getItem("flockmodCustomUIFontWeight") || "regular";

        if (customizationsEnabled) {
            applyFontWeightPreview(savedFontWeight);
        } else {
            document.documentElement.style.removeProperty(
                "--flockmod-custom-ui-font-weight"
            );
        }
    }

    function addModButton() {
        const bottomBar = document.querySelector(
            "#bottombar > nav > div > ul:nth-child(3)"
        );

        if (!bottomBar) {
            return false;
        }

        if (bottomBar.querySelector(MOD_BUTTON_SELECTOR)) {
            return true;
        }

        const modItem = document.createElement("li");
        modItem.className = "nav-item";

        const modButton = document.createElement("a");
        modButton.href = "#";
        modButton.className = "nav-link themeModMenuButton";

        modButton.innerHTML = `
            <svg
                viewBox="0 0 24 24"
                width="16"
                height="16"
                aria-hidden="true"
                style="fill: currentColor;"
            >
                <g transform="translate(12 12)">
                    <ellipse cx="0" cy="-5.2" rx="4.1" ry="4.8"/>
                    <ellipse cx="0" cy="-5.2" rx="4.1" ry="4.8" transform="rotate(72)"/>
                    <ellipse cx="0" cy="-5.2" rx="4.1" ry="4.8" transform="rotate(144)"/>
                    <ellipse cx="0" cy="-5.2" rx="4.1" ry="4.8" transform="rotate(216)"/>
                    <ellipse cx="0" cy="-5.2" rx="4.1" ry="4.8" transform="rotate(288)"/>
                    <circle cx="0" cy="0" r="2.5"/>
                </g>
            </svg>
        `;

        modButton.title = "Theme Mod Menu";

        modButton.addEventListener("click", (event) => {
            event.preventDefault();
            toggleModMenu();
        });

        modItem.appendChild(modButton);
        bottomBar.insertBefore(modItem, bottomBar.children[1]);

        return true;
    }

    function createModMenu() {
        if (document.querySelector(MOD_DIALOG_SELECTOR)) {
            return document.querySelector(MOD_DIALOG_SELECTOR);
        }

        const dialog = document.createElement("div");

        dialog.className = "dialog dialogVisible dialogFocus";
        dialog.setAttribute("name", "themeModMenu");

        Object.assign(dialog.style, {
            width: "500px",
            height: "350px",
            minWidth: "400px",
            minHeight: "300px",
            top: "150px",
            left: "250px"
        });

        dialog.innerHTML = `
            <div>
                <div class="dialogTitlebar movable">
                    <div class="dialogTitle">
                        <div class="pull-left">
                            <i class="fas fa-palette"></i>
                            <span>Theme Mod Menu</span>
                        </div>

                        <div class="dialogTitleButtons">
                            <div style="text-align: right;">
                                <a href="#" class="btn btn-md closeButton" title="Close">
                                    <i class="fas fa-window-close titleButton"></i>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="themeModContent">

                    <div class="themeModSidebar">

                        <button class="themeModSidebarItem active" data-theme-section="general">
                            General
                        </button>

                        <button class="themeModSidebarItem" data-theme-section="interface">
                            Interface
                        </button>

                        <button class="themeModSidebarItem" data-theme-section="colors">
                            Colors
                        </button>

                        <button class="themeModSidebarItem" data-theme-section="sidebar">
                            Sidebar
                        </button>

                        <button class="themeModSidebarItem" data-theme-section="animations">
                            Animations
                        </button>

                        <button class="themeModSidebarItem" data-theme-section="advanced">
                            Advanced
                        </button>

                        <div class="themeModSidebarFill"></div>

                    </div>

                    <div class="themeModPanel">

                        <div class="themeModSectionTitle">
                            General
                        </div>

                        <div class="themeModSectionContent" data-theme-panel="general">

                            <div class="themeModSetting">

                                <div class="themeModSettingText">
                                    <div class="themeModSettingName">
                                        Enable customizations
                                    </div>

                                    <div class="themeModSettingDescription">
                                        Turn your FlockMod customizations on or off.
                                    </div>
                                </div>

                                <label class="themeModToggle">

                                    <input type="checkbox" id="themeModEnabled">

                                    <span class="themeModToggleTrack">
                                        <span class="themeModToggleOption themeModToggleOff">
                                            OFF
                                        </span>

                                        <span class="themeModToggleOption themeModToggleOn">
                                            ON
                                        </span>

                                        <span class="themeModToggleThumb"></span>
                                    </span>

                                </label>

                            </div>

                        </div>

                        <div class="themeModSectionContent" data-theme-panel="interface">

                            <div class="themeModSubsectionTitle">
                                Font
                            </div>

                            <div class="themeModSetting themeModNoDivider">

                                <div class="themeModSettingText">
                                    <div class="themeModSettingName">
                                        UI Font
                                    </div>

                                    <div class="themeModSettingDescription">
                                        Choose the font used by the FlockMod interface.
                                    </div>
                                </div>

                                <select id="themeModUIFont" class="themeModSelect">
                                    <option value="default">FlockMod default</option>
                                    <option value="Arial">Arial</option>
                                    <option value="Verdana">Verdana</option>
                                    <option value="Trebuchet MS">Trebuchet MS</option>
                                    <option value="Georgia">Georgia</option>
                                </select>

                            </div>

                            <div class="themeModSetting themeModNoDivider">

                                <div class="themeModSettingText">
                                    <div class="themeModSettingName">
                                        UI Font Size
                                    </div>

                                    <div class="themeModSettingDescription">
                                        Choose the size used by the FlockMod interface.
                                    </div>
                                </div>

                                <select id="themeModUIFontSize" class="themeModSelect">
                                    <option value="small">Small</option>
                                    <option value="medium">Medium</option>
                                    <option value="large">Large</option>
                                </select>

                            </div>

                            <div class="themeModSetting themeModNoDivider">

                                <div class="themeModSettingText">
                                    <div class="themeModSettingName">
                                        UI Font Weight
                                    </div>

                                    <div class="themeModSettingDescription">
                                        Choose the weight used by the FlockMod interface.
                                    </div>
                                </div>

                                <select id="themeModUIFontWeight" class="themeModSelect">
                                    <option value="regular">Regular</option>
                                    <option value="medium">Medium</option>
                                    <option value="semibold">Semibold</option>
                                    <option value="bold">Bold</option>
                                </select>

                            </div>

                        </div>

                        <div class="themeModActions">

                            <button type="button" class="themeModResetButton">
                                Reset
                            </button>

                            <button type="button" class="themeModApplyButton">
                                Apply Changes
                            </button>

                        </div>

                    </div>

                </div>

            </div>

            <div class="dialogSize dsBar sbTop"></div>
            <div class="dialogSize dsBar sbBottom"></div>
            <div class="dialogSize dsBar sbLeft"></div>
            <div class="dialogSize dsBar sbRight"></div>

            <div class="dialogSize dsCorner sbTopLeft"></div>
            <div class="dialogSize dsCorner sbTopRight"></div>
            <div class="dialogSize dsCorner sbBottomLeft"></div>
            <div class="dialogSize dsCorner sbBottomRight"></div>
        `;

        const dialogContainer =
            document.querySelector("#dialogContainer");

        if (!dialogContainer) {
            return null;
        }

        const backdrop = document.createElement("div");
        backdrop.className = "themeModBackdrop";

        dialogContainer.appendChild(backdrop);
        dialogContainer.appendChild(dialog);

        setupDragging(dialog);
        setupResizing(dialog);
        setupCloseButton(dialog);
        setupSidebarNavigation(dialog);

        const enabledToggle =
            dialog.querySelector("#themeModEnabled");

        const savedState =
            localStorage.getItem(
                "flockmodCustomizationsEnabled"
            );

        if (savedState !== null) {
            customizationsEnabled =
                savedState === "true";
        }

        enabledToggle.checked =
            customizationsEnabled;

        enabledToggle.addEventListener("change", () => {
            customizationsEnabled =
                enabledToggle.checked;

            localStorage.setItem(
                "flockmodCustomizationsEnabled",
                customizationsEnabled
            );

            document.documentElement.classList.toggle(
                "flockmodCustomizationsDisabled",
                !customizationsEnabled
            );

            if (customizationsEnabled) {
                applySavedFont();
                applySavedFontSize();
                applySavedFontWeight();
            } else {
                document.documentElement.style.removeProperty(
                    "--flockmod-custom-ui-font"
                );

                document.documentElement.style.removeProperty(
                    "--flockmod-custom-ui-font-size"
                );

                document.documentElement.style.removeProperty(
                    "--flockmod-custom-ui-font-weight"
                );
            }
        });

        const fontSelect =
            dialog.querySelector("#themeModUIFont");

        const savedFont =
            localStorage.getItem("flockmodCustomUIFont") ||
            "default";

        fontSelect.value =
            savedFont;

        if (
            savedFont !== "default" &&
            customizationsEnabled
        ) {
            document.documentElement.style.setProperty(
                "--flockmod-custom-ui-font",
                `"${savedFont}", sans-serif`
            );
        }

        const fontSizeSelect =
            dialog.querySelector("#themeModUIFontSize");

        const savedFontSize =
            localStorage.getItem(
                "flockmodCustomUIFontSize"
            ) || "medium";

        fontSizeSelect.value =
            savedFontSize;

        if (customizationsEnabled) {
            applyFontSizePreview(
                savedFontSize
            );
        }

        const fontWeightSelect =
            dialog.querySelector("#themeModUIFontWeight");

        const savedFontWeight =
            localStorage.getItem(
                "flockmodCustomUIFontWeight"
            ) || "regular";

        fontWeightSelect.value =
            savedFontWeight;

        if (customizationsEnabled) {
            applyFontWeightPreview(
                savedFontWeight
            );
        }

        fontSelect.addEventListener("change", () => {
            const selectedFont =
                fontSelect.value;

            if (selectedFont === "default") {
                document.documentElement.style.removeProperty(
                    "--flockmod-custom-ui-font"
                );
            } else {
                document.documentElement.style.setProperty(
                    "--flockmod-custom-ui-font",
                    `"${selectedFont}", sans-serif`
                );
            }
        });

        fontSizeSelect.addEventListener("change", () => {
            applyFontSizePreview(
                fontSizeSelect.value
            );
        });

        fontWeightSelect.addEventListener("change", () => {
            applyFontWeightPreview(
                fontWeightSelect.value
            );
        });

        const applyButton =
            dialog.querySelector(
                ".themeModApplyButton"
            );

        const resetButton =
            dialog.querySelector(
                ".themeModResetButton"
            );

        applyButton.addEventListener("click", () => {

            localStorage.setItem(
                "flockmodCustomUIFont",
                fontSelect.value
            );

            localStorage.setItem(
                "flockmodCustomUIFontSize",
                fontSizeSelect.value
            );

            localStorage.setItem(
                "flockmodCustomUIFontWeight",
                fontWeightSelect.value
            );
        });

        resetButton.addEventListener("click", () => {

            fontSelect.value =
                "default";

            document.documentElement.style.removeProperty(
                "--flockmod-custom-ui-font"
            );

            fontSizeSelect.value =
                "medium";

            applyFontSizePreview(
                "medium"
            );

            fontWeightSelect.value =
                "regular";

            applyFontWeightPreview(
                "regular"
            );

            localStorage.setItem(
                "flockmodCustomUIFont",
                "default"
            );

            localStorage.setItem(
                "flockmodCustomUIFontSize",
                "medium"
            );

            localStorage.setItem(
                "flockmodCustomUIFontWeight",
                "regular"
            );
        });

        return dialog;
    }

    function setupDragging(dialog) {
        const titleBar =
            dialog.querySelector(
                ".dialogTitlebar"
            );

        let dragging = false;
        let startX = 0;
        let startY = 0;
        let startLeft = 0;
        let startTop = 0;

        titleBar.addEventListener(
            "pointerdown",
            (event) => {

                if (
                    event.target.closest(
                        ".closeButton"
                    )
                ) {
                    return;
                }

                dragging = true;

                startX =
                    event.clientX;

                startY =
                    event.clientY;

                startLeft =
                    dialog.offsetLeft;

                startTop =
                    dialog.offsetTop;

                titleBar.setPointerCapture(
                    event.pointerId
                );
            }
        );

        titleBar.addEventListener(
            "pointermove",
            (event) => {

                if (!dragging) {
                    return;
                }

                const dx =
                    event.clientX -
                    startX;

                const dy =
                    event.clientY -
                    startY;

                let newLeft =
                    startLeft + dx;

                let newTop =
                    startTop + dy;

                const screenWidth =
                    window.innerWidth;

                const screenHeight =
                    window.innerHeight;

                const dialogWidth =
                    dialog.offsetWidth;

                const dialogHeight =
                    dialog.offsetHeight;

                const minLeft =
                    0;

                const maxLeft =
                    screenWidth -
                    dialogWidth;

                const minTop =
                    0;

                const maxTop =
                    screenHeight -
                    dialogHeight;

                newLeft =
                    Math.max(
                        minLeft,
                        Math.min(
                            newLeft,
                            maxLeft
                        )
                    );

                newTop =
                    Math.max(
                        minTop,
                        Math.min(
                            newTop,
                            maxTop
                        )
                    );

                dialog.style.left =
                    `${newLeft}px`;

                dialog.style.top =
                    `${newTop}px`;
            }
        );

        titleBar.addEventListener(
            "pointerup",
            () => {
                dragging = false;
            }
        );

        titleBar.addEventListener(
            "pointercancel",
            () => {
                dragging = false;
            }
        );
    }

    function setupResizing(dialog) {
        const minWidth = 400;
        const minHeight = 300;

        function setupHandle(
            handle,
            direction
        ) {
            let resizing = false;

            let startX;
            let startY;
            let startWidth;
            let startHeight;
            let startLeft;
            let startTop;

            handle.addEventListener(
                "pointerdown",
                (event) => {

                    event.preventDefault();

                    resizing = true;

                    startX =
                        event.clientX;

                    startY =
                        event.clientY;

                    startWidth =
                        dialog.offsetWidth;

                    startHeight =
                        dialog.offsetHeight;

                    startLeft =
                        dialog.offsetLeft;

                    startTop =
                        dialog.offsetTop;

                    handle.setPointerCapture(
                        event.pointerId
                    );
                }
            );

            handle.addEventListener(
                "pointermove",
                (event) => {

                    if (!resizing) {
                        return;
                    }

                    const dx =
                        event.clientX -
                        startX;

                    const dy =
                        event.clientY -
                        startY;

                    let width =
                        startWidth;

                    let height =
                        startHeight;

                    let left =
                        startLeft;

                    let top =
                        startTop;

                    if (
                        direction.includes(
                            "right"
                        )
                    ) {
                        width =
                            Math.max(
                                minWidth,
                                startWidth +
                                dx
                            );
                    }

                    if (
                        direction.includes(
                            "left"
                        )
                    ) {
                        width =
                            Math.max(
                                minWidth,
                                startWidth -
                                dx
                            );

                        if (
                            width >
                            minWidth
                        ) {
                            left =
                                startLeft +
                                dx;
                        } else {
                            left =
                                startLeft +
                                (
                                    startWidth -
                                    minWidth
                                );
                        }
                    }

                    if (
                        direction.includes(
                            "bottom"
                        )
                    ) {
                        height =
                            Math.max(
                                minHeight,
                                startHeight +
                                dy
                            );
                    }

                    if (
                        direction.includes(
                            "top"
                        )
                    ) {
                        height =
                            Math.max(
                                minHeight,
                                startHeight -
                                dy
                            );

                        if (
                            height >
                            minHeight
                        ) {
                            top =
                                startTop +
                                dy;
                        } else {
                            top =
                                startTop +
                                (
                                    startHeight -
                                    minHeight
                                );
                        }
                    }

                    dialog.style.width =
                        `${width}px`;

                    dialog.style.height =
                        `${height}px`;

                    if (
                        direction.includes(
                            "left"
                        )
                    ) {
                        dialog.style.left =
                            `${left}px`;
                    }

                    if (
                        direction.includes(
                            "top"
                        )
                    ) {
                        dialog.style.top =
                            `${top}px`;
                    }
                }
            );

            handle.addEventListener(
                "pointerup",
                () => {
                    resizing = false;
                }
            );

            handle.addEventListener(
                "pointercancel",
                () => {
                    resizing = false;
                }
            );
        }

        setupHandle(
            dialog.querySelector(".sbTop"),
            "top"
        );

        setupHandle(
            dialog.querySelector(".sbBottom"),
            "bottom"
        );

        setupHandle(
            dialog.querySelector(".sbLeft"),
            "left"
        );

        setupHandle(
            dialog.querySelector(".sbRight"),
            "right"
        );

        setupHandle(
            dialog.querySelector(".sbTopLeft"),
            "top left"
        );

        setupHandle(
            dialog.querySelector(".sbTopRight"),
            "top right"
        );

        setupHandle(
            dialog.querySelector(".sbBottomLeft"),
            "bottom left"
        );

        setupHandle(
            dialog.querySelector(".sbBottomRight"),
            "bottom right"
        );
    }

    function setupCloseButton(dialog) {
        const closeButton =
            dialog.querySelector(
                ".closeButton"
            );

        closeButton.addEventListener(
            "click",
            (event) => {

                event.preventDefault();

                const savedFont =
                    localStorage.getItem(
                        "flockmodCustomUIFont"
                    ) || "default";

                const savedFontSize =
                    localStorage.getItem(
                        "flockmodCustomUIFontSize"
                    ) || "medium";

                const savedFontWeight =
                    localStorage.getItem(
                        "flockmodCustomUIFontWeight"
                    ) || "regular";

                if (
                    savedFont ===
                    "default"
                ) {
                    document.documentElement.style.removeProperty(
                        "--flockmod-custom-ui-font"
                    );
                } else {
                    document.documentElement.style.setProperty(
                        "--flockmod-custom-ui-font",
                        `"${savedFont}", sans-serif`
                    );
                }

                applyFontSizePreview(
                    savedFontSize
                );

                applyFontWeightPreview(
                    savedFontWeight
                );

                const backdrop =
                    document.querySelector(
                        ".themeModBackdrop"
                    );

                if (backdrop) {
                    backdrop.remove();
                }

                dialog.remove();
            }
        );
    }

    function setupSidebarNavigation(dialog) {
        const sidebarButtons =
            dialog.querySelectorAll(
                ".themeModSidebarItem"
            );

        const sectionTitle =
            dialog.querySelector(
                ".themeModSectionTitle"
            );

        const sectionPanels =
            dialog.querySelectorAll(
                ".themeModSectionContent"
            );

        const actions =
            dialog.querySelector(
                ".themeModActions"
            );

        actions.style.display =
            "none";

        sidebarButtons.forEach(
            (button) => {

                button.addEventListener(
                    "click",
                    () => {

                        sidebarButtons.forEach(
                            (item) => {
                                item.classList.remove(
                                    "active"
                                );
                            }
                        );

                        button.classList.add(
                            "active"
                        );

                        const sectionName =
                            button.dataset
                                .themeSection;

                        sectionTitle.textContent =
                            sectionName
                                .charAt(0)
                                .toUpperCase() +
                            sectionName.slice(1);

                        sectionPanels.forEach(
                            (panel) => {

                                if (
                                    panel.dataset
                                        .themePanel ===
                                    sectionName
                                ) {
                                    panel.style.display =
                                        "block";
                                } else {
                                    panel.style.display =
                                        "none";
                                }
                            }
                        );

                        if (
                            sectionName ===
                            "interface"
                        ) {
                            actions.style.display =
                                "flex";
                        } else {
                            actions.style.display =
                                "none";
                        }
                    }
                );
            }
        );
    }

    function toggleModMenu() {
        const existingMenu =
            document.querySelector(
                MOD_DIALOG_SELECTOR
            );

        if (existingMenu) {
            existingMenu.remove();
            return;
        }

        createModMenu();
    }

    function initialize() {
        const savedState =
            localStorage.getItem(
                "flockmodCustomizationsEnabled"
            );

        if (savedState !== null) {
            customizationsEnabled =
                savedState === "true";
        }

        document.documentElement.classList.toggle(
            "flockmodCustomizationsDisabled",
            !customizationsEnabled
        );

        applySavedFont();
        applySavedFontSize();
        applySavedFontWeight();

        if (addModButton()) {
            return;
        }

        setTimeout(
            initialize,
            500
        );
    }

    initialize();
})();