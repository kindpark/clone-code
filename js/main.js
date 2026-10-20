document.addEventListener("DOMContentLoaded", () => {
  // 스크롤 이동 헬퍼 함수
  const setupSlider = (listId, prevBtnId, nextBtnId) => {
    const list = document.getElementById(listId);
    const prevBtn = document.getElementById(prevBtnId);
    const nextBtn = document.getElementById(nextBtnId);

    if (list && nextBtn) {
      nextBtn.addEventListener("click", () => {
        list.scrollBy({ left: 340, behavior: "smooth" });
      });
    }

    if (list && prevBtn) {
      prevBtn.addEventListener("click", () => {
        list.scrollBy({ left: -340, behavior: "smooth" });
      });
    }
  };

  // 각 섹션별 스크롤 연결
  setupSlider("notebookList", "lineupPrev", "lineupNext");
  setupSlider("prList", "prPrev", "prNext");
});
//슬라이드 컨텐츠
document.addEventListener("DOMContentLoaded", () => {
  const list = document.getElementById("productList");
  const prevBtn = document.getElementById("topSliderPrev");
  const nextBtn = document.getElementById("topSliderNext");

  if (!list || !prevBtn || !nextBtn) return;

  // 1. 버튼 활성화/비활성화 상태 업데이트 함수
  const updateButtonState = () => {
    const scrollLeft = list.scrollLeft;
    const maxScroll = list.scrollWidth - list.clientWidth;

    prevBtn.disabled = scrollLeft <= 2;
    nextBtn.disabled = scrollLeft >= maxScroll - 2;
  };

  // 2. 우측 버튼 클릭 시 끝(또는 일정 거리)까지 스크롤
  nextBtn.addEventListener("click", () => {
    // 맨 끝까지 한 번에 보낼 수도 있고, 일정 거리(예: 400px) 이동도 가능합니다.
    const maxScroll = list.scrollWidth - list.clientWidth;

    list.scrollTo({
      left: maxScroll, // 끝까지 슬라이드
      behavior: "smooth",
    });
  });

  // 3. 좌측 버튼 클릭 시 맨 왼쪽으로 스크롤
  prevBtn.addEventListener("click", () => {
    list.scrollTo({
      left: 0, // 맨 처음으로 슬라이드
      behavior: "smooth",
    });
  });

  // 4. 스크롤할 때마다 버튼 상태 실시간 체크
  list.addEventListener("scroll", updateButtonState);

  // 초기 상태 체크 실행
  updateButtonState();
});

//라인업 제품군 클릭 이벤트 일어났을때, 상단 필터링
document.addEventListener("DOMContentLoaded", () => {
  const filterBtns = document.querySelectorAll(".filter-btn");
  const productCards = document.querySelectorAll(".notebook-box");

  filterBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      //모든 버튼에서 active 클래스 제거 후 클릭된 버튼에만 active 추가
      filterBtns.forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");
      //걸러주는 값?
      const filterValue = btn.getAttribute("data-filter");

      productCards.forEach((card) => {
        const cardCategory = card.getAttribute("data-category");
        if (filterValue === "all" || filterValue === cardCategory) {
          card.style.display = "flex";
        } else {
          card.style.display = "none";
        }
      });
    });
  });
});
//4. 함께 여는 애플의 세계
const accordionItems = document.querySelectorAll(".accordion-item");

accordionItems.forEach((item) => {
  const header = item.querySelector(".item-header");

  if (header) {
    header.addEventListener("click", (e) => {
      e.stopPropagation();

      const currentItem = e.currentTarget.closest(".accordion-item");
      const isOpen = currentItem.classList.contains("active");

      // 1. 모든 아코디언을 접힘 상태로 초기화
      accordionItems.forEach((i) => {
        i.classList.remove("active");
        i.classList.add("collapsed");
      });

      // 2. 기존에 닫혀있던 항목 클릭 시에만 펼치기
      if (!isOpen) {
        currentItem.classList.add("active");
        currentItem.classList.remove("collapsed");
      }
    });
  }
});
