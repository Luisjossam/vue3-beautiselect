import {
  defineComponent,
  h,
  ref,
  computed,
  ComputedRef,
  nextTick,
  watch,
} from "vue";
import "./styles.css";
export default defineComponent({
  props: {
    label: {
      type: String,
      default: "",
      required: false,
    },
    width: {
      type: String,
      default: "auto",
      required: false,
    },
    placeholder: {
      type: String,
      default: "",
      required: false,
    },
    customStyles: {
      type: Object,
      default: () => ({}),
    },
    data: {
      type: Array,
      default: () => [],
    },
    displayProperty: {
      type: String,
      default: "",
      required: false,
    },
    modelValue: {
      type: String,
      default: "",
    },
    emptyText: {
      type: String,
      default: "No results",
    },
    dark: Boolean,
    id: {
      type: String,
      default: "defaultID",
    },
  },
  emits: ["update:modelValue"],
  setup(props, { emit }) {
    const isDark = props.dark;
    console.log(isDark);

    const defaultStyles = {
      borderColor: "#739321",
      borderRadius: "0px",
      paddingTop: "5px",
      paddingBottom: "5px",
      paddingLeft: "5px",
    };
    const mergedStyles = { ...defaultStyles, ...props.customStyles };
    const showMenu = ref(false);
    const tabindexList = ref(0);
    const computedData: ComputedRef<any[]> = computed(() => {
      const search = inputValue.value.toLowerCase();

      if (search) {
        const wordSearch = search.split("").filter(Boolean);
        if (props.displayProperty === "") {
          return props.data.filter((item: any) => {
            return wordSearch.every((word) => item.includes(word));
          });
        } else {
          return props.data.filter((item: any) => {
            const value = (item[props.displayProperty] || "").toLowerCase();
            return wordSearch.every((word) => value.includes(word));
          });
        }
      } else {
        return props.data;
      }
    });
    const itemRefs = ref([]);
    const beautiselectRef = ref(null);
    const toList = () => {
      showMenu.value = true;
      if (computedData.value.length === 0) {
        nextTick(() => {
          beautiselectRef.value.focus();
        });
      } else {
        nextTick(() => {
          itemRefs.value[0].focus();
        });
      }
    };
    const handleKeyDown = (event: any) => {
      if (event.key === "ArrowDown") {
        event.preventDefault();
        if (!showMenu.value) {
          toList();
        } else {
          if (computedData.value.length > 0) {
            nextTick(() => {
              itemRefs.value[0].focus();
            });
          }
        }
      }
    };
    const handleSelectItem = (value: any) => {
      if (props.displayProperty === "") {
        inputValue.value = value;
      } else {
        inputValue.value = value[props.displayProperty];
        emit("update:modelValue", value[props.displayProperty]);
      }
      showMenu.value = false;
      tabindexList.value = 0;
      beautiselectRef.value.focus();
    };
    const handleLisKeyDown = (event: any, data: any) => {
      event.preventDefault();
      switch (event.key) {
        case "ArrowUp":
          if (tabindexList.value === null) {
            tabindexList.value = 0;
          } else if (tabindexList.value > 0) {
            tabindexList.value--;
            nextTick(() => itemRefs.value[tabindexList.value].focus());
          } else if (tabindexList.value === 0) {
            beautiselectRef.value.focus();
          }
          break;
        case "ArrowDown":
          if (tabindexList.value === null) {
            tabindexList.value = 0;
          } else if (tabindexList.value < computedData.value.length - 1) {
            tabindexList.value++;
            nextTick(() => itemRefs.value[tabindexList.value].focus());
          }
          break;
        case "Enter":
          handleSelectItem(data);
          break;
      }
    };
    const handleSwitchMenu = () => {
      if (showMenu.value) {
        showMenu.value = false;
      } else {
        showMenu.value = true;
        tabindexList.value = 0;
        if (computedData.value.length > 0) {
          nextTick(() => {
            itemRefs.value[0].focus();
          });
        }
      }
    };
    const inputValue = ref(props.modelValue);

    const updateValue = (newValue: string) => {
      inputValue.value = newValue;
      emit("update:modelValue", newValue);
    };
    const closeMenuOutsideClick = (event: any) => {
      const target = event.target;
      const menu = document.getElementById("boxID");

      if (!menu.contains(target)) {
        showMenu.value = false;
      }
    };
    watch(showMenu, (newValue) => {
      if (newValue) {
        document.addEventListener("click", closeMenuOutsideClick);
      } else {
        document.removeEventListener("click", closeMenuOutsideClick);
      }
    });

    return () => {
      return h(
        "div",
        {
          id: "boxID",
          class: "bs__container__class",
          style: { width: props.width, color: props.dark ? "white" : "black" },
        },
        [
          h("label", { class: "bs__label__class", for: props.id }, props.label),
          h("input", {
            id: props.id,
            class: [
              "bs__input__class",
              props.dark ? "bs__input__dark__class" : "",
            ],
            ref: beautiselectRef,
            style: mergedStyles,
            placeholder: props.placeholder,
            value: inputValue.value,
            oninput: (event: any) => updateValue(event.target.value),
            onkeydown: handleKeyDown,
          }),
          h(
            "button",
            {
              class: [
                "bs__btn__class",
                props.dark ? "bs__btn__dark__class" : "",
              ],
              type: "button",
              style: {
                paddingTop: mergedStyles.paddingTop,
                paddingBottom: mergedStyles.paddingBottom,
              },
            },
            [
              h(
                "svg",
                {
                  class: [
                    "bs__transition__class",
                    showMenu.value ? "rotate" : "",
                  ],
                  style: {
                    paddingLeft: mergedStyles.paddingLeft,
                    paddingRight: mergedStyles.paddingLeft,
                  },
                  xmlns: "http://www.w3.org/2000/svg",
                  viewBox: "6 0 15 22",
                  width: "20",
                  height: "20",
                  onclick: handleSwitchMenu,
                },
                [
                  h("path", {
                    d: "M10 9l4 5 4-5",
                    fill: "none",
                    stroke: "#000000",
                    strokeWidth: "3",
                    strokeLinecap: "round",
                  }),
                ]
              ),
            ]
          ),
          h(
            "div",
            {
              class: [
                "bs__boxData__class",
                showMenu.value
                  ? "bs__boxData__anim__class"
                  : "bs__boxData__out__anim__class",
                props.dark ? "bs__boxData__dark__class" : "",
              ],
              style: { borderRadius: mergedStyles.borderRadius },
            },
            [
              computedData.value.length === 0
                ? h(
                    "p",
                    {
                      style: {
                        textAlign: "center",
                        color: props.dark ? "white" : "black",
                      },
                    },
                    props.emptyText
                  )
                : computedData.value.map((item: any, index: number) =>
                    h(
                      "button",
                      {
                        type: "button",
                        class: [
                          "bs__boxData__item__class",
                          props.dark ? "bs__boxData__item__dark__class" : "",
                        ],
                        onclick: () => handleSelectItem(item),
                        onkeydown: (event: any) =>
                          handleLisKeyDown(event, item),
                        tabindex: tabindexList,
                        ref: (el) => (itemRefs.value[index] = el),
                      },
                      props.displayProperty === ""
                        ? item
                        : item[props.displayProperty]
                    )
                  ),
            ]
          ),
        ]
      );
    };
  },
});
