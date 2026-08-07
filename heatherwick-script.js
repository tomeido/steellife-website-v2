/* STEELLIFE - Heatherwick Style Interactions */
/* Restructured: Dynamic project grid from image folder data */

document.addEventListener('DOMContentLoaded', () => {
    // Elements
    const menuBtn = document.getElementById('menuBtn');
    const navOverlay = document.getElementById('navOverlay');
    const navClose = document.getElementById('navClose');
    const categoryBtns = document.querySelectorAll('.category-btn');
    const navLinks = document.querySelectorAll('.nav-link');
    const projectGrid = document.getElementById('projectGrid');
    const studioSection = document.getElementById('studioSection');
    const heroVideoLeft = document.getElementById('heroVideoLeft');
    const heroVideoRight = document.getElementById('heroVideoRight');

    // Heatherwick-style elements
    const loadingOverlay = document.getElementById('loadingOverlay');
    const customCursor = document.getElementById('customCursor');
    const projectModal = document.getElementById('projectModal');
    const modalClose = document.getElementById('modalClose');
    const galleryContainer = document.getElementById('galleryContainer');
    const galleryDots = document.getElementById('galleryDots');
    const galleryPrev = document.getElementById('galleryPrev');
    const galleryNext = document.getElementById('galleryNext');
    const modalTitle = document.getElementById('modalTitle');
    const modalLocation = document.getElementById('modalLocation');
    const modalDescription = document.getElementById('modalDescription');

    // Gallery state
    let currentSlide = 0;
    let currentGalleryItems = [];

    // =====================================================
    // PROJECT DATA - All 64 projects organized by category
    // =====================================================
    const allProjects = [
        {
            category: 'exhibition',
            isSignature: true,
            name: 'DDP 동대문디자인플라자',
            folder: 'images/2_ExhibitionCultural/1_DDP',
            mainImage: 'main.png',
            subImages: ['sub (1).jpeg', 'sub (1).png', 'sub (2).png', 'sub (3).jpeg', 'sub (5).jpeg', 'sub (6).jpeg', 'sub (7).jpeg', 'sub (8).jpeg', 'sub (9).jpeg', 'sub (10).jpeg', 'sub (11).jpeg', 'sub (12).jpeg', 'sub (13).jpeg']
        },
        {
            category: 'exhibition',
            isSignature: true,
            name: '현대 고양 모터스튜디오',
            folder: 'images/2_ExhibitionCultural/2_현대고양모터스튜디오',
            mainImage: 'main.png',
            subImages: ['sub (1).png', 'sub (2).png']
        },
        {
            category: 'office',
            isSignature: true,
            name: 'LH 진주사옥',
            folder: 'images/5_OfficeHeadquarters/1_LH진주사옥',
            mainImage: 'main.png',
            subImages: ['sub (1).jpeg', 'sub (1).png', 'sub (2).jpeg', 'sub (2).png', 'sub (3).png']
        },
        {
            category: 'education',
            isSignature: true,
            name: '코오롱 글로벌센터',
            folder: 'images/4_EducationScienceTechnology/2_코오롱글로벌센터',
            mainImage: 'main.png',
            subImages: ['sub (1).png']
        },
        {
            category: 'office',
            isSignature: true,
            name: '울릉도 코스모스호텔',
            folder: 'images/5_OfficeHeadquarters/3_울릉도코스모스호텔',
            mainImage: 'main.png',
            subImages: ['sub (1).jpeg', 'sub (1).png', 'sub (2).jpeg', 'sub (2).png', 'sub (3).jpeg', 'sub (3).png', 'sub (4).jpeg', 'sub (4).png', 'sub (5).jpeg', 'sub (5).png', 'sub (6).jpeg', 'sub (7).jpeg', 'sub (8).jpeg', 'sub (9).jpeg', 'sub (10).jpeg', 'sub (11).jpeg', 'sub (12).jpeg', 'sub (13).jpeg', 'sub (14).jpeg', 'sub (15).jpeg', 'sub (16).jpeg', 'sub (17).jpeg', 'sub (18).jpeg']
        },
        {
            category: 'exhibition',
            isSignature: true,
            name: '전곡선사박물관',
            folder: 'images/2_ExhibitionCultural/5_전곡선사박물관',
            mainImage: 'main.jpeg',
            subImages: ['sub (1).jpeg', 'sub (1).jpg', 'sub (1).png', 'sub (2).jpeg', 'sub (2).png', 'sub (3).png', 'sub (4).png', 'sub (5).png', 'sub (6).png', 'sub (7).png']
        },
        {
            category: 'office',
            isSignature: true,
            name: 'YG 엔터테인먼트 사옥',
            folder: 'images/5_OfficeHeadquarters/2_YG엔터네인먼트사옥',
            mainImage: 'main.jpeg',
            subImages: ['sub (1).jpeg', 'sub (2).jpeg', 'sub (3).jpeg']
        },
        {
            category: 'exhibition',
            isSignature: true,
            name: '여수엑스포 주제관',
            folder: 'images/2_ExhibitionCultural/7_여수엑스포주제관',
            mainImage: 'main.png',
            subImages: ['sub (1).jpeg', 'sub (1).png', 'sub (2).jpeg', 'sub (2).png', 'sub (3).jpeg', 'sub (3).png', 'sub (4).jpeg', 'sub (5).jpeg', 'sub (6).jpeg', 'sub (7).jpeg']
        },
        {
            category: 'aviation',
            isSignature: true,
            name: '인천공항 제1터미널',
            folder: 'images/1_AviationTransportation/1_인천공항1터미널',
            mainImage: 'main.jpeg',
            subImages: ['sub.png']
        },
        {
            category: 'aviation',
            isSignature: true,
            name: '인천공항 제2터미널',
            folder: 'images/1_AviationTransportation/2_인천공항2터미널',
            mainImage: 'main.png',
            subImages: ['sub (1).jpeg', 'sub (1).png', 'sub (2).jpeg', 'sub (2).png', 'sub (3).jpeg', 'sub (3).png']
        },
        {
            category: 'aviation',
            isSignature: true,
            name: '아부다비 미드필드 터미널',
            folder: 'images/1_AviationTransportation/4_아부다비미드필드터미널',
            mainImage: 'main.jpeg',
            subImages: ['sub (1).jpeg', 'sub (1).png', 'sub (2).jpeg', 'sub (2).png']
        },
        {
            category: 'exhibition',
            isSignature: true,
            name: '송도 컨벤션센터 2단계',
            folder: 'images/2_ExhibitionCultural/8_송도컨벤션센터2단계',
            mainImage: 'main.jpeg',
            subImages: []
        },
        {
            category: 'exhibition',
            isSignature: true,
            name: '필리핀 아레나',
            folder: 'images/2_ExhibitionCultural/14_필리핀아레나',
            mainImage: 'main.png',
            subImages: ['sub (1).png', 'sub (2).png']
        },
        {
            category: 'exhibition',
            isSignature: true,
            name: '대상공원 맘스프리존',
            folder: 'images/2_ExhibitionCultural/17_대상공원맘스프리존',
            mainImage: 'main.jpeg',
            subImages: ['sub.jpeg', 'sub.png']
        },
        {
            category: 'sports',
            isSignature: true,
            name: 'KNFC',
            folder: 'images/3_Sports/13_KNFC',
            mainImage: 'main.jpeg',
            subImages: []
        },
        {
            category: 'education',
            isSignature: true,
            name: '제주시 새활용센터',
            folder: 'images/4_EducationScienceTechnology/6_제주시새활용센터',
            mainImage: 'main.png',
            subImages: ['sub (1).png']
        },
        {
            category: 'office',
            isSignature: true,
            name: '드레곤시티호텔 대연회장',
            folder: 'images/5_OfficeHeadquarters/6_드레곤시티호텔대연회장',
            mainImage: 'main.jpeg',
            subImages: ['sub (1).jpeg', 'sub (2).jpeg']
        },
        {
            category: 'office',
            name: '현대기아 트레이닝센터',
            folder: 'images/5_OfficeHeadquarters/9_현대기아트레이닝센터',
            mainImage: 'main.jpeg',
            subImages: ['sub (1).jpeg', 'sub (2).jpeg']
        },
        {
            category: 'education',
            name: '현대 천안 글로벌연수원',
            folder: 'images/4_EducationScienceTechnology/4_현대천안글로벌연수원',
            mainImage: 'main.jpeg',
            subImages: ['sub.jpeg']
        },
        {
            category: 'education',
            name: '한독 제넥신 연구소',
            folder: 'images/4_EducationScienceTechnology/5_한독제넥신연구소',
            mainImage: 'main.jpeg',
            subImages: ['sub.jpeg']
        },
        {
            category: 'aviation',
            name: '몽골공항 NUBIA',
            folder: 'images/1_AviationTransportation/3_몽골공항NUBIA',
            mainImage: 'main.jpeg',
            subImages: ['sub.png']
        },
        {
            category: 'aviation',
            name: '판교역 알파돔시티 링크브릿지',
            folder: 'images/1_AviationTransportation/5_판교역알파돔시티링크브릿지',
            mainImage: 'main.jpeg',
            subImages: ['sub1.jpeg', 'sub2.jpeg', 'sub3.png', 'sub4.png']
        },
        {
            category: 'aviation',
            name: '군산항 국제여객터미널',
            folder: 'images/1_AviationTransportation/6_군산항국제여객터미널',
            mainImage: 'main.png',
            subImages: ['sub.png']
        },
        {
            category: 'aviation',
            name: '제주항 국제여객터미널',
            folder: 'images/1_AviationTransportation/7_제주항국제여객터미널',
            mainImage: 'main.png',
            subImages: []
        },
        {
            category: 'aviation',
            name: '인천공항 선경서역사',
            folder: 'images/1_AviationTransportation/8_인천공항선경서역사',
            mainImage: 'main.jpg',
            subImages: []
        },
        {
            category: 'aviation',
            name: '인천공항 제2복합청사',
            folder: 'images/1_AviationTransportation/9_인천공항제2복합청사',
            mainImage: 'main.jpeg',
            subImages: ['sub (1).jpeg', 'sub (2).jpeg']
        },
        {
            category: 'aviation',
            name: '국제물류센터',
            folder: 'images/1_AviationTransportation/10_국제물류센터',
            mainImage: 'main.jpeg',
            subImages: ['sub.jpeg']
        },
        {
            category: 'exhibition',
            name: '여수엑스포 삼성관',
            folder: 'images/2_ExhibitionCultural/6_여수엑스포삼성관',
            mainImage: 'main.jpg',
            subImages: ['sub (1).jpeg', 'sub (1).png', 'sub (2).jpeg', 'sub (3).jpeg']
        },
        {
            category: 'exhibition',
            name: '포스코 홍보관',
            folder: 'images/2_ExhibitionCultural/3_포스코홍보관',
            mainImage: 'main.png',
            subImages: ['sub.png']
        },
        {
            category: 'exhibition',
            name: '포스코 역사관',
            folder: 'images/2_ExhibitionCultural/4_포스코역사관',
            mainImage: 'main.jpeg',
            subImages: ['sub.png']
        },
        {
            category: 'exhibition',
            name: '국립과천과학관',
            folder: 'images/2_ExhibitionCultural/12_국립과천과학관',
            mainImage: 'main.jpeg',
            subImages: []
        },
        {
            category: 'exhibition',
            name: '김대중 컨벤션센터',
            folder: 'images/2_ExhibitionCultural/11_김대중컨벤션센터',
            mainImage: 'main.jpeg',
            subImages: ['sub (1).jpeg', 'sub (2).jpeg']
        },
        {
            category: 'exhibition',
            name: '서서울 미술관',
            folder: 'images/2_ExhibitionCultural/19_서서울미술관',
            mainImage: 'main.jpeg',
            subImages: ['sub.png']
        },
        {
            category: 'exhibition',
            name: '박태준 기념관',
            folder: 'images/2_ExhibitionCultural/9_박태준기념관',
            mainImage: 'main.jpeg',
            subImages: []
        },
        {
            category: 'exhibition',
            name: '누리마루 APEC하우스',
            folder: 'images/2_ExhibitionCultural/10_누리마루APEC하우스',
            mainImage: 'main.png',
            subImages: ['sub.jpeg']
        },
        {
            category: 'exhibition',
            name: '대구 학생문화센터',
            folder: 'images/2_ExhibitionCultural/13_대구학생문화센터',
            mainImage: 'main.png',
            subImages: []
        },
        {
            category: 'exhibition',
            name: '고성 통일전망대',
            folder: 'images/2_ExhibitionCultural/15_고성통일전망대',
            mainImage: 'main.jpeg',
            subImages: ['sub (1).png', 'sub (2).png']
        },
        {
            category: 'exhibition',
            name: '상암 DMC 홍보관',
            folder: 'images/2_ExhibitionCultural/16_상암DMC홍보관',
            mainImage: 'main.jpeg',
            subImages: ['sub (1).png', 'sub (2).png']
        },
        {
            category: 'exhibition',
            name: '시흥 문화예술회관',
            folder: 'images/2_ExhibitionCultural/18_시흥문화예술회관',
            mainImage: 'main.png',
            subImages: ['sub (1).png', 'sub (2).png']
        },
        {
            category: 'sports',
            name: '잠실 체조경기장',
            folder: 'images/3_Sports/1_잠실체조경기장',
            mainImage: 'main.jpeg',
            subImages: []
        },
        {
            category: 'sports',
            name: '잠실 체육관',
            folder: 'images/3_Sports/2_잠실체육관',
            mainImage: 'main.png',
            subImages: ['sub.jpeg']
        },
        {
            category: 'sports',
            name: '울산 문수수영장',
            folder: 'images/3_Sports/3_울산문수수영장',
            mainImage: 'main.jpeg',
            subImages: ['sub (1).jpeg', 'sub (2).jpeg']
        },
        {
            category: 'sports',
            name: '진주 체육관',
            folder: 'images/3_Sports/4_진주체육관',
            mainImage: 'main.png',
            subImages: ['sub (1).jpeg', 'sub (2).jpeg']
        },
        {
            category: 'sports',
            name: '영주 실내체육관',
            folder: 'images/3_Sports/5_영주실내체육관',
            mainImage: 'main.jpeg',
            subImages: []
        },
        {
            category: 'sports',
            name: '충주 실내체육관',
            folder: 'images/3_Sports/6_충주실내체육관',
            mainImage: 'main.jpeg',
            subImages: []
        },
        {
            category: 'sports',
            name: '김천 실내수영장',
            folder: 'images/3_Sports/8_김천실내수영장',
            mainImage: 'main.jpg',
            subImages: ['sub (1).jpeg', 'sub (2).jpeg']
        },
        {
            category: 'sports',
            name: '원주시 국민체육센터',
            folder: 'images/3_Sports/9_원주시국민체육센터',
            mainImage: 'main.png',
            subImages: ['sub.jpeg']
        },
        {
            category: 'sports',
            name: '태능 선수촌 개선관',
            folder: 'images/3_Sports/11_태능선수촌개선관',
            mainImage: 'main.jpeg',
            subImages: []
        },
        {
            category: 'sports',
            name: '동대문 실내수영장',
            folder: 'images/3_Sports/12_동대문실내수영장',
            mainImage: 'main.jpeg',
            subImages: ['sub.jpeg']
        },
        {
            category: 'sports',
            name: '은평 구민체육센터',
            folder: 'images/3_Sports/7_은평구민체육센터',
            mainImage: 'main.png',
            subImages: ['sub.jpeg']
        },
        {
            category: 'sports',
            name: '경산 시민운동장',
            folder: 'images/3_Sports/10_경산시민운동장',
            mainImage: 'main.png',
            subImages: []
        },
        {
            category: 'sports',
            name: '레인보우힐스 CC',
            folder: 'images/3_Sports/14_레인보우힐스CC',
            mainImage: 'main.jpg',
            subImages: ['sub (1).jpeg', 'sub (2).jpeg']
        },
        {
            category: 'education',
            name: '경주 교원연수원',
            folder: 'images/4_EducationScienceTechnology/1_경주교원연수원',
            mainImage: 'main.jpeg',
            subImages: ['sub (1).jpeg', 'sub (2).jpeg', 'sub (3).jpeg']
        },
        {
            category: 'education',
            name: '송도 글로벌캠퍼스',
            folder: 'images/4_EducationScienceTechnology/3_송도글로벌캠퍼스',
            mainImage: 'main.jpeg',
            subImages: ['sub (1).jpeg', 'sub (2).jpeg']
        },
        {
            category: 'education',
            name: '광명동굴 VR체험관',
            folder: 'images/4_EducationScienceTechnology/8_광명동굴VR체험관',
            mainImage: 'main.jpeg',
            subImages: ['sub.jpeg']
        },
        {
            category: 'education',
            name: '남부광역 생활폐기물처리시설',
            folder: 'images/4_EducationScienceTechnology/7_남부광역생활폐기물처리시설',
            mainImage: 'main.jpeg',
            subImages: []
        },
        {
            category: 'office',
            name: '파라다이스호텔 크로마클럽터널',
            folder: 'images/5_OfficeHeadquarters/4_파라다이스호텔크로마클럽터널',
            mainImage: 'main.png',
            subImages: ['sub (1).jpeg', 'sub (1).png', 'sub (2).jpeg', 'sub (2).png']
        },
        {
            category: 'office',
            name: '파라다이스호텔 원더박스입구',
            folder: 'images/5_OfficeHeadquarters/5_파라다이스호텔원더박스입구',
            mainImage: 'main.jpeg',
            subImages: []
        },
        {
            category: 'office',
            name: 'NAVER 세종각',
            folder: 'images/5_OfficeHeadquarters/8_NAVER세종각',
            mainImage: 'main.png',
            subImages: []
        },
        {
            category: 'office',
            name: '광명동굴 VR체험센터',
            folder: 'images/5_OfficeHeadquarters/7_광명동굴VR체험센터',
            mainImage: 'main.jpeg',
            subImages: []
        },
        {
            category: 'office',
            name: '증산도 상생월드센터',
            folder: 'images/5_OfficeHeadquarters/10_증산도상생월드센터',
            mainImage: 'main.png',
            subImages: []
        },
        {
            category: 'office',
            name: '남산 게스트하우스',
            folder: 'images/5_OfficeHeadquarters/11_남산게스트하우스',
            mainImage: 'main.png',
            subImages: []
        },
        {
            category: 'office',
            name: '캐나다 오크리지 포디움',
            folder: 'images/5_OfficeHeadquarters/12_캐나다오크리지포디움',
            mainImage: 'main.png',
            subImages: ['sub.jpeg', 'sub.png']
        },
        {
            category: 'office',
            name: '현대자동차 이천 자가사옥',
            folder: 'images/5_OfficeHeadquarters/13_현대자동차이천자가사옥',
            mainImage: 'main.png',
            subImages: []
        }
    ];

    // Category display names
    const categoryNames = {
        signature: 'Signature Projects',
        aviation: 'Aviation / Transportation',
        exhibition: 'Exhibition / Cultural',
        sports: 'Sports',
        education: 'Education / Science & Technology',
        office: 'Office / Headquarters'
    };

    // =====================================================
    // Photo Drag & Drop Reorder State & Logic
    // =====================================================
    const REORDER_STORAGE_KEY = 'steellife_project_order_v100';
    const SIGNATURE_STORAGE_KEY = 'steellife_signature_list_v100';
    let isReorderModeActive = false;
    let draggedItemIndex = null;
    let selectedForMoveIndex = null;
    const defaultProjectsOrder = [...allProjects];

    // Restore saved order from LocalStorage if available
    function loadSavedProjectOrder() {
        try {
            const savedData = localStorage.getItem(REORDER_STORAGE_KEY);
            if (savedData) {
                const savedNames = JSON.parse(savedData);
                if (Array.isArray(savedNames) && savedNames.length > 0) {
                    const projectMap = new Map(allProjects.map(p => [p.name, p]));
                    const reordered = [];
                    savedNames.forEach(name => {
                        if (projectMap.has(name)) {
                            reordered.push(projectMap.get(name));
                            projectMap.delete(name);
                        }
                    });
                    projectMap.forEach(proj => reordered.push(proj));
                    
                    allProjects.length = 0;
                    allProjects.push(...reordered);
                    console.log('Restored saved photo order from LocalStorage');
                }
            }
        } catch (e) {
            console.error('Failed to load saved project order:', e);
        }
    }

    // Restore saved signature list from LocalStorage if available
    function loadSavedSignatureList() {
        try {
            const savedData = localStorage.getItem(SIGNATURE_STORAGE_KEY);
            if (savedData) {
                const signatureNames = new Set(JSON.parse(savedData));
                allProjects.forEach(p => {
                    p.isSignature = signatureNames.has(p.name);
                });
                console.log('Restored signature list from LocalStorage');
            }
        } catch (e) {
            console.error('Failed to load saved signature list:', e);
        }
    }

    // Save signature list to LocalStorage
    function saveSignatureList() {
        try {
            const signatureNames = allProjects.filter(p => p.isSignature).map(p => p.name);
            localStorage.setItem(SIGNATURE_STORAGE_KEY, JSON.stringify(signatureNames));
        } catch (e) {
            console.error('Failed to save signature list:', e);
        }
    }

    loadSavedProjectOrder();
    loadSavedSignatureList();

    // Toast notification helper
    function showToast(message) {
        const toast = document.getElementById('toastNotification');
        if (!toast) return;
        toast.textContent = message;
        toast.classList.add('show');
        setTimeout(() => {
            toast.classList.remove('show');
        }, 3000);
    }

    // =====================================================
    // Dynamic Project Grid Rendering (with Drag & Drop + Click-to-Move support)
    // =====================================================
    function renderProjectGrid() {
        if (!projectGrid) return;
        projectGrid.innerHTML = '';

        allProjects.forEach((project, index) => {
            const link = document.createElement('a');
            link.href = '#';
            link.className = 'project-item' + (isReorderModeActive ? ' draggable-mode' : '');
            if (isReorderModeActive && selectedForMoveIndex === index) {
                link.classList.add('selected-for-move');
            }
            link.dataset.category = project.category;
            if (project.isSignature || project.signature) {
                link.dataset.signature = 'true';
            }
            link.dataset.index = index;

            if (isReorderModeActive) {
                link.setAttribute('draggable', 'true');
            }

            const img = document.createElement('img');
            img.src = `${project.folder}/${project.mainImage}`;
            img.alt = project.name;
            img.loading = index < 8 ? 'eager' : 'lazy';

            const overlay = document.createElement('div');
            overlay.className = 'project-overlay';
            overlay.innerHTML = `
                <h2>${project.name}</h2>
                <p>${categoryNames[project.category] || ''}</p>
            `;

            link.appendChild(img);
            link.appendChild(overlay);

            // Signature Toggle Button (star)
            const sigBtn = document.createElement('button');
            sigBtn.className = 'signature-toggle-btn' + (project.isSignature ? ' active' : '');
            sigBtn.title = project.isSignature ? '시그니처에서 제거' : '시그니처에 추가';
            sigBtn.innerHTML = project.isSignature ? '★' : '☆';
            
            sigBtn.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                
                project.isSignature = !project.isSignature;
                saveSignatureList();

                const activeCategoryBtn = document.querySelector('.category-btn.active');
                const currentCategory = activeCategoryBtn ? activeCategoryBtn.dataset.filter : 'all';

                if (project.isSignature) {
                    showToast(`⭐ [${project.name}] 시그니처에 추가되었습니다.`);
                } else {
                    showToast(`❌ [${project.name}] 시그니처에서 제외되었습니다.`);
                }

                renderProjectGrid();
                filterProjects(currentCategory);
            });

            link.appendChild(sigBtn);

            if (isReorderModeActive) {
                const badge = document.createElement('div');
                badge.className = 'reorder-badge';
                badge.textContent = selectedForMoveIndex === index ? `선택됨 (#${index + 1})` : `#${index + 1}`;
                link.appendChild(badge);

                const handle = document.createElement('div');
                handle.className = 'drag-handle';
                handle.title = '드래그하거나 클릭하여 순서 변경';
                handle.innerHTML = '⠿';
                link.appendChild(handle);
            }

            // Click handler: Open modal in normal mode, Click-to-Move in reorder mode
            link.addEventListener('click', (e) => {
                e.preventDefault();
                if (!isReorderModeActive) {
                    openGallery(project);
                    return;
                }

                // In Reorder Mode: Click-to-Move logic
                if (selectedForMoveIndex === null) {
                    selectedForMoveIndex = index;
                    renderProjectGrid();
                    showToast(`📌 [${project.name}] 선택됨. 이동시킬 위치의 사진을 클릭하거나 드래그하세요.`);
                } else if (selectedForMoveIndex === index) {
                    selectedForMoveIndex = null;
                    renderProjectGrid();
                    showToast(`취소되었습니다.`);
                } else {
                    const fromIdx = selectedForMoveIndex;
                    const toIdx = index;
                    const [movedProject] = allProjects.splice(fromIdx, 1);
                    allProjects.splice(toIdx, 0, movedProject);
                    
                    selectedForMoveIndex = null;
                    renderProjectGrid();
                    showToast(`✨ 사진 위치 변경 완료! (#${fromIdx + 1} ➔ #${toIdx + 1})`);
                }
            });

            // HTML5 Drag & Drop Event Listeners
            if (isReorderModeActive) {
                link.addEventListener('dragstart', (e) => {
                    draggedItemIndex = index;
                    link.classList.add('dragging');
                    e.dataTransfer.effectAllowed = 'move';
                    try {
                        e.dataTransfer.setData('text/plain', index.toString());
                    } catch (err) {}
                });

                link.addEventListener('dragover', (e) => {
                    e.preventDefault();
                    e.dataTransfer.dropEffect = 'move';
                    if (draggedItemIndex !== null && draggedItemIndex !== index) {
                        link.classList.add('drag-over');
                    }
                });

                link.addEventListener('dragleave', () => {
                    link.classList.remove('drag-over');
                });

                link.addEventListener('drop', (e) => {
                    e.preventDefault();
                    link.classList.remove('drag-over');
                    
                    if (draggedItemIndex !== null && draggedItemIndex !== index) {
                        const fromIdx = draggedItemIndex;
                        const toIdx = index;
                        const [movedProject] = allProjects.splice(fromIdx, 1);
                        allProjects.splice(toIdx, 0, movedProject);
                        
                        draggedItemIndex = null;
                        selectedForMoveIndex = null;
                        renderProjectGrid();
                        showToast(`✨ 사진 위치 변경 완료! (#${fromIdx + 1} ➔ #${toIdx + 1})`);
                    }
                });

                link.addEventListener('dragend', () => {
                    link.classList.remove('dragging');
                    document.querySelectorAll('.project-item').forEach(item => item.classList.remove('drag-over', 'dragging'));
                    draggedItemIndex = null;
                });
            }

            // Custom cursor hover (disabled in reorder mode)
            link.addEventListener('mouseenter', () => {
                if (customCursor && !isReorderModeActive) customCursor.classList.add('active');
            });
            link.addEventListener('mouseleave', () => {
                if (customCursor) customCursor.classList.remove('active');
            });

            projectGrid.appendChild(link);
        });

        // Observe items for scroll animation
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        }, observerOptions);

        projectGrid.querySelectorAll('.project-item').forEach(item => {
            observer.observe(item);
        });

        // Maintain active category filter if set
        const activeBtn = document.querySelector('.category-btn.active');
        if (activeBtn && activeBtn.dataset.filter) {
            const currentCat = activeBtn.dataset.filter;
            projectGrid.querySelectorAll('.project-item').forEach(item => {
                const itemCategory = item.dataset.category;
                const isSignature = item.dataset.signature === 'true';
                if (currentCat === 'all' || (currentCat === 'signature' && isSignature) || itemCategory === currentCat) {
                    item.classList.remove('hidden');
                } else {
                    item.classList.add('hidden');
                }
            });
        }
    }

    // =====================================================
    // Admin Mode Detection (Shows reorder button only on admin URL)
    // =====================================================
    const urlParams = new URLSearchParams(window.location.search);
    const pathname = window.location.pathname.toLowerCase();
    const hash = window.location.hash.toLowerCase();

    const isAdmin = urlParams.has('admin') || 
                    urlParams.get('mode') === 'admin' || 
                    pathname.includes('admin') || 
                    hash.includes('admin');

    if (isAdmin) {
        document.body.classList.add('admin-mode');
    }

    // Reorder Toolbar Event Listeners
    const toggleReorderBtn = document.getElementById('toggleReorderBtn');
    const reorderActions = document.getElementById('reorderActions');
    const saveOrderBtn = document.getElementById('saveOrderBtn');
    const resetOrderBtn = document.getElementById('resetOrderBtn');
    const exportOrderBtn = document.getElementById('exportOrderBtn');

    if (toggleReorderBtn) {
        toggleReorderBtn.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            isReorderModeActive = !isReorderModeActive;
            if (isReorderModeActive) {
                document.body.classList.add('reorder-mode-active');
                toggleReorderBtn.classList.add('active');
                toggleReorderBtn.querySelector('.text').textContent = '순서 변경 완료';
                reorderActions?.classList.remove('hidden');
                showToast('⠿ 드래그 앤 드롭 순서 변경 모드가 활성화되었습니다.');
            } else {
                document.body.classList.remove('reorder-mode-active');
                toggleReorderBtn.classList.remove('active');
                toggleReorderBtn.querySelector('.text').textContent = '사진 순서 변경 (Drag & Drop)';
                reorderActions?.classList.add('hidden');
                selectedForMoveIndex = null;
            }
            renderProjectGrid();
        });
    }

    if (saveOrderBtn) {
        saveOrderBtn.addEventListener('click', () => {
            try {
                const orderNames = allProjects.map(p => p.name);
                localStorage.setItem(REORDER_STORAGE_KEY, JSON.stringify(orderNames));
                showToast('💾 사진 순서가 브라우저에 성공적으로 저장되었습니다!');
            } catch (e) {
                console.error(e);
                showToast('❌ 순서 저장 중 오류가 발생했습니다.');
            }
        });
    }

    if (resetOrderBtn) {
        resetOrderBtn.addEventListener('click', () => {
            if (confirm('사진 순서 및 시그니처 설정을 원본 기본 상태로 초기화하시겠습니까?')) {
                localStorage.removeItem(REORDER_STORAGE_KEY);
                localStorage.removeItem(SIGNATURE_STORAGE_KEY);
                allProjects.length = 0;
                allProjects.push(...defaultProjectsOrder);
                loadSavedSignatureList();
                renderProjectGrid();
                const activeCategoryBtn = document.querySelector('.category-btn.active');
                const currentCategory = activeCategoryBtn ? activeCategoryBtn.dataset.filter : 'signature';
                filterProjects(currentCategory);
                showToast('↺ 사진 순서 및 시그니처 목록이 원본으로 초기화되었습니다.');
            }
        });
    }

    if (exportOrderBtn) {
        exportOrderBtn.addEventListener('click', () => {
            const orderList = allProjects.map((p, i) => `${i + 1}. ${p.name} [${p.isSignature ? '★ 시그니처' : '일반'}] (${p.category})`).join('\n');
            navigator.clipboard.writeText(orderList).then(() => {
                showToast('📋 순서 및 시그니처 목록이 클립보드에 복사되었습니다!');
            }).catch(() => {
                alert('순서 목록:\n\n' + orderList);
            });
        });
    }

    // =====================================================
    // Loading Animation
    // =====================================================
    window.addEventListener('load', () => {
        setTimeout(() => {
            if (loadingOverlay) {
                loadingOverlay.classList.add('hidden');
            }
        }, 800);
    });

    // =====================================================
    // Custom Cursor
    // =====================================================
    let cursorX = 0, cursorY = 0;
    let targetX = 0, targetY = 0;

    document.addEventListener('mousemove', (e) => {
        targetX = e.clientX;
        targetY = e.clientY;
    });

    function animateCursor() {
        cursorX += (targetX - cursorX) * 0.15;
        cursorY += (targetY - cursorY) * 0.15;

        if (customCursor) {
            customCursor.style.left = cursorX + 'px';
            customCursor.style.top = cursorY + 'px';
        }
        requestAnimationFrame(animateCursor);
    }
    animateCursor();

    // =====================================================
    // Project Gallery Modal
    // =====================================================

    function openGallery(project) {
        const detailsGrid = document.getElementById('detailsGrid');
        const tabDescription = document.getElementById('tabDescription');
        const tabDetails = document.getElementById('tabDetails');
        const modalTabs = document.querySelectorAll('.modal-tab');

        // Build media items: main image + all sub images
        const mediaItems = [];

        // Add main image first
        mediaItems.push({
            type: 'image',
            src: `${project.folder}/${project.mainImage}`
        });

        // Add sub images
        project.subImages.forEach(sub => {
            mediaItems.push({
                type: 'image',
                src: `${project.folder}/${sub}`
            });
        });

        // Set modal info
        if (modalTitle) modalTitle.textContent = project.name;
        if (modalLocation) modalLocation.textContent = categoryNames[project.category] || '';
        if (modalDescription) modalDescription.textContent = `STEELLIFE의 ${project.name} 프로젝트입니다.`;

        // Set details
        if (detailsGrid) {
            detailsGrid.innerHTML = '';
            const detailFields = [
                { label: 'Category', value: categoryNames[project.category] },
                { label: 'Images', value: `${mediaItems.length}` }
            ];
            detailFields.forEach(field => {
                if (field.value) {
                    const item = document.createElement('div');
                    item.className = 'detail-item';
                    item.innerHTML = `
                        <span class="detail-label">${field.label}</span>
                        <span class="detail-value">${field.value}</span>
                    `;
                    detailsGrid.appendChild(item);
                }
            });
        }

        // Reset tabs to Description
        modalTabs.forEach(tab => tab.classList.remove('active'));
        modalTabs[0]?.classList.add('active');
        if (tabDescription) tabDescription.classList.add('active');
        if (tabDetails) tabDetails.classList.remove('active');

        currentGalleryItems = mediaItems;
        currentSlide = 0;

        // Clear gallery container
        if (galleryContainer) galleryContainer.innerHTML = '';
        if (galleryDots) galleryDots.innerHTML = '';

        // Create gallery items
        mediaItems.forEach((item, index) => {
            const galleryItem = document.createElement('div');
            galleryItem.className = 'gallery-item' + (index === 0 ? ' active' : '');

            const img = document.createElement('img');
            img.src = item.src;
            img.alt = project.name;
            galleryItem.appendChild(img);

            if (galleryContainer) galleryContainer.appendChild(galleryItem);

            // Create dot
            if (mediaItems.length > 1 && galleryDots) {
                const dot = document.createElement('button');
                dot.className = 'gallery-dot' + (index === 0 ? ' active' : '');
                dot.addEventListener('click', () => goToSlide(index));
                galleryDots.appendChild(dot);
            }
        });

        // Show/hide navigation arrows
        if (galleryPrev) galleryPrev.style.display = mediaItems.length > 1 ? 'block' : 'none';
        if (galleryNext) galleryNext.style.display = mediaItems.length > 1 ? 'block' : 'none';

        // Open modal
        if (projectModal) {
            projectModal.classList.add('active');
            document.body.style.overflow = 'hidden';
        }
    }

    // Navigate to specific slide
    function goToSlide(index) {
        const items = galleryContainer?.querySelectorAll('.gallery-item');
        const dots = galleryDots?.querySelectorAll('.gallery-dot');

        if (!items || items.length === 0) return;

        items[currentSlide]?.classList.remove('active');
        dots?.[currentSlide]?.classList.remove('active');

        currentSlide = (index + items.length) % items.length;

        items[currentSlide]?.classList.add('active');
        dots?.[currentSlide]?.classList.add('active');
    }

    // Navigation buttons
    if (galleryPrev) {
        galleryPrev.addEventListener('click', () => goToSlide(currentSlide - 1));
    }
    if (galleryNext) {
        galleryNext.addEventListener('click', () => goToSlide(currentSlide + 1));
    }

    if (modalClose) {
        modalClose.addEventListener('click', closeModal);
    }

    function closeModal() {
        if (projectModal) {
            projectModal.classList.remove('active');
            document.body.style.overflow = '';
        }
    }

    // Tab switching for Description/Details
    document.querySelectorAll('.modal-tab').forEach(tab => {
        tab.addEventListener('click', () => {
            const tabName = tab.dataset.tab;
            const tabDescription = document.getElementById('tabDescription');
            const tabDetails = document.getElementById('tabDetails');

            document.querySelectorAll('.modal-tab').forEach(t => t.classList.remove('active'));
            tab.classList.add('active');

            if (tabName === 'description') {
                if (tabDescription) tabDescription.classList.add('active');
                if (tabDetails) tabDetails.classList.remove('active');
            } else {
                if (tabDescription) tabDescription.classList.remove('active');
                if (tabDetails) tabDetails.classList.add('active');
            }
        });
    });

    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (!projectModal?.classList.contains('active')) return;

        if (e.key === 'Escape') {
            closeModal();
        } else if (e.key === 'ArrowLeft') {
            goToSlide(currentSlide - 1);
        } else if (e.key === 'ArrowRight') {
            goToSlide(currentSlide + 1);
        }
    });

    // =====================================================
    // Video Configuration
    // =====================================================
    const projectsVideos = [
        'videos/projects/ddp/ddpzaha_003.mp4',
        'videos/projects/ddp/ddpzaha_004.mp4',
        'videos/projects/arena/Arena058.mp4',
        'videos/projects/arena/Arena064.mp4',
        'videos/projects/hyundai/Hyundai024.mp4',
        'videos/projects/lh/lh_002.mp4',
        'videos/projects/lh/lh_006.mp4',
        'videos/projects/soma/soma_002.mp4',
        'videos/projects/soma/soma_005.mp4',
        'videos/projects/villakosmos/villakosmos_030.mp4',
        'videos/projects/villakosmos/villakosmos_033.mp4'
    ];

    const companyVideosByFolder = {
        arena: [
            'videos/company/arena/Designer_manipulating_holographi…_202608041040.mp4'
        ],
        ddp: [
            'videos/company/ddp/Designer_modifying_3D_building_mesh_202608041045.mp4'
        ],
        hyundai: [
            'videos/company/hyundai/Korean_designer_working_3D_model_202608041310.mp4'
        ],
        lh: [
            'videos/company/lh/Designer_rotating_3D_tower_model_202608041220.mp4'
        ],
        soma: [
            'videos/company/soma/Designer_editing_3D_model_software_202608041232.mp4'
        ],
        villakosmos: [
            'videos/company/villakosmos/Designer_working_on_3D_model_202608041236.mp4'
        ]
    };

    function getMatchingCompanyVideo(projectVideoPath) {
        const parts = projectVideoPath.split('/');
        const folderName = parts.length >= 3 ? parts[2] : '';
        const list = companyVideosByFolder[folderName];
        if (list && list.length > 0) {
            return list[Math.floor(Math.random() * list.length)];
        }
        const allCompanyVideos = Object.values(companyVideosByFolder).flat();
        return allCompanyVideos[Math.floor(Math.random() * allCompanyVideos.length)];
    }

    function setRandomVideos() {
        if (!heroVideoLeft || !heroVideoRight) return;
        const randomProjectVideo = projectsVideos[Math.floor(Math.random() * projectsVideos.length)];
        const matchingCompanyVideo = getMatchingCompanyVideo(randomProjectVideo);
        heroVideoLeft.src = randomProjectVideo;
        heroVideoRight.src = matchingCompanyVideo;
        heroVideoLeft.play().catch(e => console.log("Auto-play prevented", e));
        heroVideoRight.play().catch(e => console.log("Auto-play prevented", e));
    }

    setRandomVideos();

    // Video Container Click Handlers
    const videoContainerLeft = document.querySelector('.video-container.left');
    const videoContainerRight = document.querySelector('.video-container.right');

    if (videoContainerLeft) {
        videoContainerLeft.addEventListener('click', () => {
            projectGrid.style.display = 'grid';
            if (studioSection) studioSection.classList.remove('active');
            document.querySelector('.category-bar').style.display = '';
            navLinks.forEach(l => l.classList.remove('active'));
            const projectsNavLink = document.querySelector('.nav-link[data-category="projects"]');
            if (projectsNavLink) projectsNavLink.classList.add('active');
            projectGrid.scrollIntoView({ behavior: 'smooth', block: 'start' });
        });
    }

    if (videoContainerRight) {
        videoContainerRight.addEventListener('click', () => {
            projectGrid.style.display = 'none';
            if (studioSection) studioSection.classList.add('active');
            document.querySelector('.category-bar').style.display = 'none';
            navLinks.forEach(l => l.classList.remove('active'));
            const companyNavLink = document.querySelector('.nav-link[data-category="company"]');
            if (companyNavLink) companyNavLink.classList.add('active');
            studioSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
        });
    }

    // Intro Overlay Animation
    const introOverlay = document.getElementById('introOverlay');
    if (introOverlay) {
        setTimeout(() => {
            introOverlay.classList.add('hidden');
        }, 2500);
    }

    // =====================================================
    // Menu Toggle
    // =====================================================
    function toggleMenu() {
        menuBtn.classList.toggle('active');
        navOverlay.classList.toggle('active');
        document.body.style.overflow = navOverlay.classList.contains('active') ? 'hidden' : '';
    }

    menuBtn.addEventListener('click', toggleMenu);
    navClose.addEventListener('click', toggleMenu);

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && navOverlay.classList.contains('active')) {
            toggleMenu();
        }
    });

    // =====================================================
    // Category Filtering
    // =====================================================
    function filterProjects(category) {
        const projectItems = projectGrid.querySelectorAll('.project-item');
        projectItems.forEach(item => {
            const itemCategory = item.dataset.category;
            const isSignature = item.dataset.signature === 'true';
            if (category === 'all' || (category === 'signature' && isSignature) || itemCategory === category) {
                item.classList.remove('hidden');
                item.style.animation = 'none';
                item.offsetHeight; // Trigger reflow
                item.style.animation = null;
            } else {
                item.classList.add('hidden');
            }
        });

        // Update active button
        categoryBtns.forEach(btn => {
            btn.classList.toggle('active', btn.dataset.filter === category);
        });
    }

    categoryBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            filterProjects(btn.dataset.filter);

            const heroSection = document.querySelector('.hero-section');
            const scrollY = window.pageYOffset;
            const heroHeight = heroSection ? heroSection.offsetHeight : 0;
            if (scrollY < heroHeight - 100) {
                projectGrid.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });

    // Navigation filter links in overlay
    const navFilterLinks = document.querySelectorAll('.nav-overlay a[data-filter]');
    navFilterLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            filterProjects(link.dataset.filter);
            toggleMenu();
        });
    });

    // =====================================================
    // Projects/Company Toggle
    // =====================================================
    const heroSection = document.querySelector('.hero-section');

    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            const category = link.dataset.category;
            const href = link.getAttribute('href');

            if (!category || (href && href !== '#' && !href.startsWith('#'))) {
                return;
            }

            e.preventDefault();

            navLinks.forEach(l => l.classList.remove('active'));
            link.classList.add('active');

            if (category === 'company') {
                projectGrid.style.display = 'none';
                if (studioSection) studioSection.classList.add('active');
                document.querySelector('.category-bar').style.display = 'none';

                const targetTab = link.dataset.companyTab || 'company';
                switchCompanyTab(targetTab);

                const scrollY = window.pageYOffset;
                const heroHeight = heroSection ? heroSection.offsetHeight : 0;
                if (scrollY < heroHeight - 100) {
                    studioSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
            } else {
                projectGrid.style.display = 'grid';
                if (studioSection) studioSection.classList.remove('active');
                document.querySelector('.category-bar').style.display = '';

                const scrollY = window.pageYOffset;
                const heroHeight = heroSection ? heroSection.offsetHeight : 0;
                if (scrollY < heroHeight - 100) {
                    projectGrid.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
            }
        });
    });

    // Company Sub-Tab Switching Logic
    function switchCompanyTab(tabKey) {
        if (!tabKey) return;
        const targetKey = tabKey.toLowerCase();
        
        // Update tab buttons (.company-tab-btn and .hw-subnav-btn)
        document.querySelectorAll('.company-tab-btn, .hw-subnav-btn').forEach(btn => {
            if (btn.dataset.companyTab && btn.dataset.companyTab.toLowerCase() === targetKey) {
                btn.classList.add('active');
            } else {
                btn.classList.remove('active');
            }
        });

        // Update tab panels
        document.querySelectorAll('.company-tab-panel').forEach(panel => {
            const panelId = panel.id.replace('companyPanel', '').toLowerCase();
            if (panelId === targetKey) {
                panel.classList.add('active');
            } else {
                panel.classList.remove('active');
            }
        });
    }

    // Attach click events to company sub-tab buttons
    document.querySelectorAll('.company-tab-btn, .hw-subnav-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const tabKey = btn.dataset.companyTab;
            switchCompanyTab(tabKey);
        });
    });

    // People Category Filter Logic
    document.querySelectorAll('.hw-people-filter-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const filterCat = btn.dataset.peopleFilter;
            
            document.querySelectorAll('.hw-people-filter-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            document.querySelectorAll('.hw-people-card').forEach(card => {
                if (filterCat === 'all' || card.dataset.peopleCat === filterCat) {
                    card.style.display = 'flex';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });

    // Handle About / Company sub-links in overlay menu
    document.querySelectorAll('a[data-category="company"]').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();

            if (navOverlay && navOverlay.classList.contains('active')) {
                toggleMenu();
            }

            navLinks.forEach(l => l.classList.remove('active'));
            const companyNavLink = document.querySelector('.nav-link[data-category="company"]');
            if (companyNavLink) companyNavLink.classList.add('active');

            projectGrid.style.display = 'none';
            if (studioSection) studioSection.classList.add('active');
            document.querySelector('.category-bar').style.display = 'none';

            const targetTab = link.dataset.companyTab || 'company';
            switchCompanyTab(targetTab);

            setTimeout(() => {
                studioSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }, 100);
        });
    });

    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (href === '#') return;

            const target = document.querySelector(href);
            if (target) {
                e.preventDefault();

                if (navOverlay.classList.contains('active')) {
                    toggleMenu();
                }

                if (href === '#contact') {
                    document.getElementById('contact').classList.add('active');
                }

                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Form submission
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const formData = new FormData(contactForm);
            const data = Object.fromEntries(formData);

            if (!data.name || !data.email || !data.message) {
                alert('Please fill in all required fields.');
                return;
            }

            console.log('Form submitted:', data);
            alert('Thank you for your message. We will get back to you soon.');
            contactForm.reset();
        });
    }

    // =====================================================
    // Header scroll effect
    // =====================================================
    let lastScroll = 0;
    const header = document.querySelector('.header');
    const categoryBar = document.querySelector('.category-bar');

    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        const threshold = window.innerHeight - 100;

        if (currentScroll > threshold) {
            header.style.background = 'rgba(0, 0, 0, 0.85)';
            header.style.backdropFilter = 'blur(20px)';
            if (categoryBar) {
                categoryBar.style.background = 'rgba(0, 0, 0, 0.85)';
                categoryBar.style.backdropFilter = 'blur(20px)';
            }
        } else {
            header.style.background = 'transparent';
            header.style.backdropFilter = 'none';
            if (categoryBar) {
                categoryBar.style.background = 'transparent';
                categoryBar.style.backdropFilter = 'none';
            }
        }

        lastScroll = currentScroll;
    });

    // =====================================================
    // COMPANY METHOD SUBPAGE & LIGHTBOX GALLERY LOGIC
    // =====================================================
    const methodSlides = [
        { src: 'method/imgi_46_img0101.jpg', title: 'MPF & MPSF - 3차원 비정형 곡면 성형 개요 (DDP)', cat: 'mpf' },
        { src: 'method/img0102.jpg', title: 'MPF & MPSF - 3차원 비정형 패널 성형 공정 및 상세', cat: 'mpf' },
        { src: 'method/imgi_46_img0201.jpg', title: 'MPF & MPSF - BIM 데이터 입력 및 3D 템플릿', cat: 'mpf' },
        { src: 'method/imgi_46_img0301.jpg', title: 'MPF & MPSF - 곡면 패널 좌표 분석 프로세스', cat: 'mpf' },
        { src: 'method/imgi_46_img0401.jpg', title: 'MPF & MPSF - 패널 도면 2D/3D 자동 변환', cat: 'mpf' },
        { src: 'method/imgi_46_img0501.jpg', title: 'MPF & MPSF - DXF/CGR 데이터 컨버팅', cat: 'mpf' },
        { src: 'method/imgi_46_img0601.jpg', title: 'MPF & MPSF - 성형 라인 수치 제어 데이터', cat: 'mpf' },
        { src: 'method/imgi_46_img0701.jpg', title: 'MPF & MPSF - 곡률 반경 시뮬레이션', cat: 'mpf' },
        { src: 'method/imgi_46_img0801.jpg', title: 'MPF & MPSF - MPSF 특수 성형기 작동 매커니즘', cat: 'mpf' },
        { src: 'method/imgi_46_img0901.jpg', title: 'MPF & MPSF - 3차원 Laser 절단 및 3D Scanner 인식', cat: 'mpf' },
        { src: 'method/imgi_46_img1001.jpg', title: 'MPF & MPSF - 알루미늄 비정형 패널 제작 현장', cat: 'mpf' },
        { src: 'method/imgi_46_img1101.jpg', title: 'MPF & MPSF - 패널 정밀 가공 및 품질 검사', cat: 'mpf' },
        { src: 'method/imgi_46_img1201.jpg', title: 'MPF & MPSF - 곡면 패널 조립 시뮬레이션', cat: 'mpf' },
        { src: 'method/imgi_46_img1301.jpg', title: 'MPF & MPSF - DDP 현장 비정형 패널 설치', cat: 'mpf' },
        { src: 'method/imgi_46_img1401.jpg', title: 'MPF & MPSF - 패널 접합부 및 프레임 상세', cat: 'mpf' },
        { src: 'method/imgi_47_img0202.jpg', title: 'FLATDECK SYSTEM - 고강도 무퍼린 덱 (누리마루 APEC)', cat: 'flatdeck' },
        { src: 'method/imgi_47_img0302.jpg', title: 'FLATDECK SYSTEM - 단면 구조 및 흡음/단열 메커니즘', cat: 'flatdeck' },
        { src: 'method/imgi_47_img0402.jpg', title: 'FLATDECK SYSTEM - 구조 계산 및 스판 검토서', cat: 'flatdeck' },
        { src: 'method/imgi_47_img0502.jpg', title: 'FLATDECK SYSTEM - 최대 6M 장스판 시공 현장', cat: 'flatdeck' },
        { src: 'method/imgi_47_img0602.jpg', title: 'FLATDECK SYSTEM - 결로/누수 방지 하수 시스템', cat: 'flatdeck' },
        { src: 'method/imgi_47_img0702.jpg', title: 'FLATDECK SYSTEM - Roof Deck 접합 조인트 상세', cat: 'flatdeck' },
        { src: 'method/imgi_47_img0802.jpg', title: 'FLATDECK SYSTEM - 하부 천정재 생략 시공 상세', cat: 'flatdeck' },
        { src: 'method/imgi_47_img0902.jpg', title: 'FLATDECK SYSTEM - 차음 및 결로방지 성능 시험', cat: 'flatdeck' },
        { src: 'method/imgi_47_img1002.jpg', title: 'FLATDECK SYSTEM - 덱 패널 하중 테스트', cat: 'flatdeck' },
        { src: 'method/imgi_47_img1102.jpg', title: 'FLATDECK SYSTEM - 지붕 시공 자동 롤포밍 현장', cat: 'flatdeck' },
        { src: 'method/imgi_47_img1202.jpg', title: 'FLATDECK SYSTEM - 패널 고정 클립 및 볼트 부착', cat: 'flatdeck' },
        { src: 'method/imgi_47_img1302.jpg', title: 'FLATDECK SYSTEM - 완성 지붕 전경 (누리마루)', cat: 'flatdeck' },
        { src: 'method/imgi_47_img1402.jpg', title: 'FLATDECK SYSTEM - 지붕 단열재 및 덱 마감', cat: 'flatdeck' },
        { src: 'method/imgi_48_img0103.jpg', title: 'B.I.M - Building Information Modeling 개념도', cat: 'bim' },
        { src: 'method/imgi_48_img1003.jpg', title: 'B.I.M - 3D 파라메트릭 골조 및 외장 동기화', cat: 'bim' },
        { src: 'method/imgi_48_img1103.jpg', title: 'B.I.M - 패널 간섭 체크 및 4D 시공 스케줄링', cat: 'bim' },
        { src: 'method/imgi_48_img1403.jpg', title: 'B.I.M - 부재별 3D 객체 정보 관리 시스템', cat: 'bim' },
        { src: 'method/imgi_49_img0104.jpg', title: 'Cladding & Steel Form Work - AL/SUS Cladding 사례', cat: 'bim' },
        { src: 'method/imgi_50_img0105.jpg', title: 'Serviceable Design Tool - Digital Project & Rhino 4.0', cat: 'tools' },
        { src: 'method/imgi_51_img0106.jpg', title: '시공사례 - 동대문 디자인 플라자 (DDP)', cat: 'cases' },
        { src: 'method/imgi_52_img0107.jpg', title: '시공사례 - 전곡선사박물관', cat: 'cases' },
        { src: 'method/imgi_53_img0108.jpg', title: '시공사례 - 여수엑스포 주제관', cat: 'cases' },
        { src: 'method/imgi_54_img0109.jpg', title: '시공사례 - 여수엑스포 삼성관', cat: 'cases' },
        { src: 'method/imgi_55_img0110.jpg', title: '시공사례 - 송도 글로벌 캠퍼스 강당동', cat: 'cases' }
    ];

    let currentMethodSlideIdx = 0;

    const methodModal = document.getElementById('methodModal');
    const methodModalTitle = document.getElementById('methodModalTitle');
    const methodModalCounter = document.getElementById('methodModalCounter');
    const methodModalImg = document.getElementById('methodModalImg');
    const closeMethodModalBtn = document.getElementById('closeMethodModalBtn');
    const prevMethodSlideBtn = document.getElementById('prevMethodSlideBtn');
    const nextMethodSlideBtn = document.getElementById('nextMethodSlideBtn');
    const methodSlideScrubber = document.getElementById('methodSlideScrubber');
    const methodThumbsStrip = document.getElementById('methodThumbsStrip');
    const openMethodGalleryBtn = document.getElementById('openMethodGalleryBtn');

    function updateMethodModalSlide(idx) {
        if (idx < 0) idx = methodSlides.length - 1;
        if (idx >= methodSlides.length) idx = 0;
        currentMethodSlideIdx = idx;

        const slide = methodSlides[currentMethodSlideIdx];
        if (methodModalImg) methodModalImg.src = slide.src;
        if (methodModalTitle) methodModalTitle.textContent = slide.title;
        if (methodModalCounter) methodModalCounter.textContent = `${currentMethodSlideIdx + 1} / ${methodSlides.length}`;
        if (methodSlideScrubber) {
            methodSlideScrubber.max = methodSlides.length;
            methodSlideScrubber.value = currentMethodSlideIdx + 1;
        }

        if (methodThumbsStrip) {
            const thumbs = methodThumbsStrip.querySelectorAll('.hw-modal-thumb');
            thumbs.forEach((t, i) => {
                if (i === currentMethodSlideIdx) {
                    t.classList.add('active');
                    t.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
                } else {
                    t.classList.remove('active');
                }
            });
        }
    }

    function openMethodModalIndex(idx) {
        if (!methodModal) return;
        if (methodThumbsStrip && methodThumbsStrip.children.length === 0) {
            methodSlides.forEach((slide, i) => {
                const div = document.createElement('div');
                div.className = 'hw-modal-thumb';
                div.innerHTML = `<img src="${slide.src}" alt="Thumb ${i+1}">`;
                div.onclick = () => updateMethodModalSlide(i);
                methodThumbsStrip.appendChild(div);
            });
        }
        updateMethodModalSlide(idx);
        methodModal.classList.remove('hidden');
        document.body.style.overflow = 'hidden';
    }

    window.openMethodModalByPath = function(path, customTitle) {
        const foundIdx = methodSlides.findIndex(s => s.src === path);
        if (foundIdx !== -1) {
            openMethodModalIndex(foundIdx);
        } else {
            openMethodModalIndex(0);
            if (methodModalImg) methodModalImg.src = path;
            if (methodModalTitle && customTitle) methodModalTitle.textContent = customTitle;
        }
    };

    function closeMethodModal() {
        if (!methodModal) return;
        methodModal.classList.add('hidden');
        document.body.style.overflow = '';
    }

    if (openMethodGalleryBtn) {
        openMethodGalleryBtn.addEventListener('click', () => openMethodModalIndex(0));
    }
    if (closeMethodModalBtn) {
        closeMethodModalBtn.addEventListener('click', closeMethodModal);
    }
    if (prevMethodSlideBtn) {
        prevMethodSlideBtn.addEventListener('click', () => updateMethodModalSlide(currentMethodSlideIdx - 1));
    }
    if (nextMethodSlideBtn) {
        nextMethodSlideBtn.addEventListener('click', () => updateMethodModalSlide(currentMethodSlideIdx + 1));
    }
    if (methodSlideScrubber) {
        methodSlideScrubber.addEventListener('input', (e) => updateMethodModalSlide(parseInt(e.target.value) - 1));
    }

    if (methodModal) {
        methodModal.addEventListener('click', (e) => {
            if (e.target === methodModal) closeMethodModal();
        });
    }

    document.addEventListener('keydown', (e) => {
        if (!methodModal || methodModal.classList.contains('hidden')) return;
        if (e.key === 'ArrowLeft') updateMethodModalSlide(currentMethodSlideIdx - 1);
        if (e.key === 'ArrowRight') updateMethodModalSlide(currentMethodSlideIdx + 1);
        if (e.key === 'Escape') closeMethodModal();
    });

    // Method Subpage Category Filtering Logic
    document.querySelectorAll('.hw-method-filter-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const filter = btn.dataset.methodFilter;
            document.querySelectorAll('.hw-method-filter-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const cards = document.querySelectorAll('.hw-method-card');
            const casesWrapper = document.querySelector('.hw-method-cases-wrapper');

            cards.forEach(card => {
                const cat = card.dataset.methodCat;
                if (filter === 'all' || filter === cat) {
                    card.style.display = 'flex';
                } else {
                    card.style.display = 'none';
                }
            });

            if (casesWrapper) {
                if (filter === 'all' || filter === 'cases') {
                    casesWrapper.style.display = 'block';
                } else {
                    casesWrapper.style.display = 'none';
                }
            }
        });
    });

    // =====================================================
    // Initialize: Render project grid (default to Signature)
    // =====================================================
    renderProjectGrid();
    filterProjects('signature');

    console.log('STEELLIFE Heatherwick-style site initialized with', allProjects.length, 'projects');
});
