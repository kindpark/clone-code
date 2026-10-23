document.addEventListener("DOMContentLoaded", () => {
  /* ==========================================================================
     1. 공통 카드 슬라이더 (라인업, PR, 갈아타기, 천생연분 한계 스크롤 방어)
     ========================================================================== */
  const setupSlider = (listId, prevBtnId, nextBtnId) => {
    const list = document.getElementById(listId);
    const prevBtn = document.getElementById(prevBtnId);
    const nextBtn = document.getElementById(nextBtnId);

    if (!list) return;

    // 스크롤 및 버튼 disabled 최신화 함수 (1~2px 오차 예방)
    const updateButtons = () => {
      const scrollLeft = list.scrollLeft;
      const maxScroll = list.scrollWidth - list.clientWidth;

      if (prevBtn) prevBtn.disabled = scrollLeft <= 2;
      if (nextBtn) nextBtn.disabled = scrollLeft >= maxScroll - 2;
    };

    if (nextBtn) {
      nextBtn.addEventListener("click", () => {
        const maxScroll = list.scrollWidth - list.clientWidth;
        
        // 이미 맨 끝에 도착해 있으면 스크롤 실행 안 함
        if (list.scrollLeft >= maxScroll - 2) return;

        // 340px 이동하되 한계를 넘지 않도록 조정
        const targetScroll = Math.min(list.scrollLeft + 340, maxScroll);
        list.scrollTo({ left: targetScroll, behavior: "smooth" });
      });
    }

    if (prevBtn) {
      prevBtn.addEventListener("click", () => {
        // 이미 맨 처음에 도착해 있으면 스크롤 실행 안 함
        if (list.scrollLeft <= 2) return;

        const targetScroll = Math.max(list.scrollLeft - 340, 0);
        list.scrollTo({ left: targetScroll, behavior: "smooth" });
      });
    }

    // 스크롤 및 화면 리사이즈 시 실시간 체크
    list.addEventListener("scroll", updateButtons);
    window.addEventListener("resize", updateButtons);

    // 초기 실행
    updateButtons();
  };

  // 각 섹션별 슬라이더 등록
  setupSlider("notebookList", "lineupPrev", "lineupNext");
  setupSlider("prList", "prPrev", "prNext");
  setupSlider("introList", "introPrev", "introNext");
  setupSlider("accessoryList", "accessoryPrev", "accessoryNext");
});

/* ==========================================================================
   2. 상단 아이콘 슬라이더 (데스크톱 2단계, 모바일 4단계 이동)
   ========================================================================== */
document.addEventListener("DOMContentLoaded", () => {
  const list = document.getElementById("productList");
  const prevBtn = document.getElementById("topSliderPrev");
  const nextBtn = document.getElementById("topSliderNext");

  if (!list || !prevBtn || !nextBtn) return;

  const updateButtonState = () => {
    const scrollLeft = list.scrollLeft;
    const maxScroll = list.scrollWidth - list.clientWidth;

    prevBtn.disabled = scrollLeft <= 2;
    nextBtn.disabled = scrollLeft >= maxScroll - 2;
  };

  const getSteps = () => {
    return window.innerWidth <= 768 ? 4 : 2;
  };

  nextBtn.addEventListener("click", () => {
    const maxScroll = list.scrollWidth - list.clientWidth;
    const steps = getSteps();
    const stepSize = maxScroll / (steps - 1);
    
    const currentStep = Math.round(list.scrollLeft / stepSize);
    const nextTarget = Math.min((currentStep + 1) * stepSize, maxScroll);

    list.scrollTo({
      left: nextTarget,
      behavior: "smooth",
    });
  });

  prevBtn.addEventListener("click", () => {
    const maxScroll = list.scrollWidth - list.clientWidth;
    const steps = getSteps();
    const stepSize = maxScroll / (steps - 1);

    const currentStep = Math.round(list.scrollLeft / stepSize);
    const prevTarget = Math.max((currentStep - 1) * stepSize, 0);

    list.scrollTo({
      left: prevTarget,
      behavior: "smooth",
    });
  });

  list.addEventListener("scroll", updateButtonState);
  updateButtonState();
});

/* ==========================================================================
   3. 라인업 필터링 및 스크롤 컨트롤 숨김/노출
   ========================================================================== */
document.addEventListener("DOMContentLoaded", () => {
  const filterBtns = document.querySelectorAll(".filter-btn");
  const productCards = document.querySelectorAll(".notebook-box");

  const updateSliderControlsVisibility = (listContainer) => {
    if (!listContainer) return;

    const controls = listContainer.parentElement?.querySelector(".scroll-controls");
    if (!controls) return;

    const hasScroll = listContainer.scrollWidth - listContainer.clientWidth > 5;

    if (hasScroll) {
      controls.style.display = "flex";
    } else {
      controls.style.display = "none";
    }
  };

  const checkAllSliders = () => {
    requestAnimationFrame(() => {
      updateSliderControlsVisibility(document.getElementById("notebookList"));
      updateSliderControlsVisibility(document.getElementById("prList"));
      updateSliderControlsVisibility(document.getElementById("introList"));
      updateSliderControlsVisibility(document.getElementById("accessoryList"));
    });
  };

  filterBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      filterBtns.forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");

      const filterValue = btn.getAttribute("data-filter");

      productCards.forEach((card) => {
        const cardCategory = card.getAttribute("data-category");
        if (filterValue === "all" || filterValue === cardCategory) {
          card.style.display = "flex";
        } else {
          card.style.display = "none";
        }
      });

      checkAllSliders();
    });
  });

  window.addEventListener("resize", checkAllSliders);
  window.addEventListener("load", checkAllSliders);
  checkAllSliders();
});

/* ==========================================================================
   4. 함께 여는 Apple의 세계 (이미지 아코디언)
   ========================================================================== */
const accordionItems = document.querySelectorAll(".accordion-item");

accordionItems.forEach((item) => {
  const header = item.querySelector(".item-header");

  if (header) {
    header.addEventListener("click", (e) => {
      e.stopPropagation();

      const currentItem = e.currentTarget.closest(".accordion-item");
      const isOpen = currentItem.classList.contains("active");

      accordionItems.forEach((i) => {
        i.classList.remove("active");
        i.classList.add("collapsed");
      });

      if (!isOpen) {
        currentItem.classList.add("active");
        currentItem.classList.remove("collapsed");
      }
    });
  }
});

/* ==========================================================================
   5. 모바일 푸터 아코디언 토글
   ========================================================================== */
document.querySelectorAll('.accordion-trigger').forEach(trigger => {
  trigger.addEventListener('click', function() {
    if (window.innerWidth < 768) {
      this.classList.toggle('is-open');
    }
  });
});

window.addEventListener('resize', () => {
  if (window.innerWidth >= 768) {
    document.querySelectorAll('.accordion-trigger').forEach(trigger => {
      trigger.classList.remove('is-open');
    });
  }
});