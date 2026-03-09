// ═══════════════════════════════════════════════════════════════
//  NEXUS ERP - FIXED VERSION
//  Sửa lỗi: Navigation, Data Loading, Modal Handling, Icons, Charts
// ═══════════════════════════════════════════════════════════════

// ────────────────────────────────────────────────────────────────
//  1. NGÔN NGỮ (Tiếng Việt & Tiếng Trung)
// ────────────────────────────────────────────────────────────────
const LANGS = {
    vi: {
        sidebar: {
            mainMenu: "QUẢN LÝ CHÍNH", operationMenu: "VẬN HÀNH", reportMenu: "BÁO CÁO",
            dashboard: "Bảng điều khiển", products: "Kho sản phẩm", orders: "Đơn hàng",
            customers: "Khách hàng", samples: "Hàng mẫu", cashflow: "Dòng tiền", analytics: "Phân tích"
        },
        header: { refresh: "Cập nhật", search: "Tìm kiếm..." },
        dashboard: {
            recentOrdersTitle: "Đơn hàng gần đây", orderID: "Mã đơn", customer: "Khách hàng", orderDate: "Ngày đặt",
            total: "Tổng tiền", status: "Trạng thái", loading: "Đang tải...", trendTitle: "Xu hướng doanh thu"
        },
        products: {
            title: "Danh sách sản phẩm", addBtnText: "Thêm sản phẩm", SKU: "SKU", name: "Tên sản phẩm", category: "Danh mục",
            price: "Giá bán", stock: "Tồn kho", status: "Trạng thái", action: "Thao tác", loading: "Đang tải..."
        },
        orders: {
            title: "Quản lý đơn hàng", orderID: "Mã đơn", date: "Ngày", customer: "Khách hàng", total: "Tổng tiền",
            paymentMethod: "Thanh toán", status: "Trạng thái", detail: "Chi tiết", loading: "Đang tải..."
        },
        customers: {
            title: "Danh sách khách hàng", addBtnText: "Thêm khách hàng", id: "ID", name: "Họ tên", phone: "SĐT",
            address: "Địa chỉ", group: "Nhóm", totalSpent: "Tổng chi tiêu", debt: "Công nợ", loading: "Đang tải..."
        },
        samples: {
            title: "Quản lý hàng mẫu", addBtnText: "Gửi hàng mẫu", date: "Ngày gửi", customer: "Khách hàng", SKU: "SKU",
            productName: "Tên sản phẩm", quantity: "Số lượng", note: "Ghi chú", loading: "Đang tải..."
        },
        cashflow: {
            title: "Quản lý dòng tiền", currentBalanceHeader: "SỐ DƯ HIỆN TẠI", date: "Ngày", type: "Loại", category: "Hạng mục",
            amount: "Số tiền", account: "Tài khoản", description: "Mô tả", loading: "Đang tải..."
        },
        analytics: { title: "Báo cáo & Phân tích", developing: "Chức năng đang phát triển" },
        stats: { revenue: "Doanh thu", orders: "Đơn hàng", products: "Sản phẩm", customers: "Khách hàng" },
        productModal: {
            title: "Thêm sản phẩm mới", nameLabel: "Tên sản phẩm *", SKULabel: "SKU *", priceLabel: "Giá bán *",
            statusLabel: "Trạng thái", statusOption1: "Đang bán", statusOption2: "Ngừng bán",
            cancelBtn: "Hủy", submitBtn: "Thêm sản phẩm"
        },
        sampleModal: {
            title: "Gửi hàng mẫu", customerLabel: "Khách hàng *", productLabel: "Sản phẩm *",
            quantityLabel: "Số lượng *", noteLabel: "Ghi chú", loadingCustomer: "Đang tải...", loadingProduct: "Đang tải...",
            cancelBtn: "Hủy", submitBtn: "Gửi hàng mẫu"
        },
        customerModal: {
            title: "Thêm khách hàng mới", nameLabel: "Họ tên *", phoneLabel: "Số điện thoại *",
            addressLabel: "Địa chỉ", groupLabel: "Nhóm khách hàng", groupOption1: "Khách lẻ", groupOption2: "Khách sỉ", groupOption3: "VIP",
            cancelBtn: "Hủy", submitBtn: "Thêm khách hàng"
        }
    },
    zh: {
        sidebar: {
            mainMenu: "主要管理", operationMenu: "运营", reportMenu: "报表",
            dashboard: "仪表板", products: "产品库", orders: "订单",
            customers: "客户", samples: "样品", cashflow: "资金流", analytics: "分析"
        },
        header: { refresh: "更新", search: "搜索..." },
        dashboard: {
            recentOrdersTitle: "最近订单", orderID: "订单号", customer: "客户", orderDate: "下单日期",
            total: "总金额", status: "状态", loading: "加载中...", trendTitle: "收入趋势"
        },
        products: {
            title: "产品列表", addBtnText: "添加产品", SKU: "SKU", name: "产品名称", category: "分类",
            price: "价格", stock: "库存", status: "状态", action: "操作", loading: "加载中..."
        },
        orders: {
            title: "订单管理", orderID: "订单号", date: "日期", customer: "客户", total: "总金额",
            paymentMethod: "付款方式", status: "状态", detail: "详情", loading: "加载中..."
        },
        customers: {
            title: "客户列表", addBtnText: "添加客户", id: "ID", name: "姓名", phone: "手机号",
            address: "地址", group: "分组", totalSpent: "总消费", debt: "欠款", loading: "加载中..."
        },
        samples: {
            title: "样品管理", addBtnText: "寄样", date: "寄出日期", customer: "客户", SKU: "SKU",
            productName: "产品名称", quantity: "数量", note: "备注", loading: "加载中..."
        },
        cashflow: {
            title: "资金流管理", currentBalanceHeader: "当前余额", date: "日期", type: "类型", category: "分类",
            amount: "金额", account: "账户", description: "描述", loading: "加载中..."
        },
        analytics: { title: "报表与分析", developing: "功能开发中..." },
        stats: { revenue: "收入", orders: "订单", products: "产品", customers: "客户" },
        productModal: {
            title: "添加新产品", nameLabel: "产品名称 *", SKULabel: "SKU *", priceLabel: "价格 *",
            statusLabel: "状态", statusOption1: "在售", statusOption2: "停售",
            cancelBtn: "取消", submitBtn: "添加产品"
        },
        sampleModal: {
            title: "寄样", customerLabel: "客户 *", productLabel: "产品 *",
            quantityLabel: "数量 *", noteLabel: "备注", loadingCustomer: "加载中...", loadingProduct: "加载中...",
            cancelBtn: "取消", submitBtn: "寄样"
        },
        customerModal: {
            title: "添加新客户", nameLabel: "姓名 *", phoneLabel: "手机号 *",
            addressLabel: "地址", groupLabel: "客户分组", groupOption1: "零售客户", groupOption2: "批发客户", groupOption3: "VIP",
            cancelBtn: "取消", submitBtn: "添加客户"
        }
    }
};

let currentLang = "vi";

// ────────────────────────────────────────────────────────────────
//  2. DỮ LIỆU MẪU (Mock Data)
// ────────────────────────────────────────────────────────────────
const mockData = {
    products: [
        { SKU: "SP001", name: "Áo thun cotton", category: "Thời trang", price: 150000, stock: 120, status: "Đang bán" },
        { SKU: "SP002", name: "Quần jean", category: "Thời trang", price: 350000, stock: 85, status: "Đang bán" },
        { SKU: "SP003", name: "Giày thể thao", category: "Giày dép", price: 550000, stock: 45, status: "Đang bán" },
        { SKU: "SP004", name: "Túi xách da", category: "Phụ kiện", price: 450000, stock: 30, status: "Đang bán" },
        { SKU: "SP005", name: "Đồng hồ", category: "Phụ kiện", price: 1200000, stock: 15, status: "Ngừng bán" }
    ],
    orders: [
        { id: "DH001", date: "2024-03-15", customer: "Nguyễn Văn A", total: 850000, payment: "Chuyển khoản", status: "Hoàn thành" },
        { id: "DH002", date: "2024-03-16", customer: "Trần Thị B", total: 1200000, payment: "Tiền mặt", status: "Đang xử lý" },
        { id: "DH003", date: "2024-03-16", customer: "Lê Văn C", total: 550000, payment: "COD", status: "Đang giao" },
        { id: "DH004", date: "2024-03-17", customer: "Phạm Thị D", total: 2100000, payment: "Chuyển khoản", status: "Hoàn thành" },
        { id: "DH005", date: "2024-03-17", customer: "Hoàng Văn E", total: 450000, payment: "Tiền mặt", status: "Chờ xác nhận" }
    ],
    customers: [
        { id: "KH001", name: "Nguyễn Văn A", phone: "0901234567", address: "Hà Nội", group: "VIP", totalSpent: 5200000, debt: 0 },
        { id: "KH002", name: "Trần Thị B", phone: "0912345678", address: "TP.HCM", group: "Khách sỉ", totalSpent: 3800000, debt: 500000 },
        { id: "KH003", name: "Lê Văn C", phone: "0923456789", address: "Đà Nẵng", group: "Khách lẻ", totalSpent: 1200000, debt: 0 },
        { id: "KH004", name: "Phạm Thị D", phone: "0934567890", address: "Cần Thơ", group: "VIP", totalSpent: 7500000, debt: 0 },
        { id: "KH005", name: "Hoàng Văn E", phone: "0945678901", address: "Hải Phòng", group: "Khách lẻ", totalSpent: 890000, debt: 200000 }
    ],
    samples: [
        { date: "2024-03-10", customer: "Nguyễn Văn A", SKU: "SP001", productName: "Áo thun cotton", quantity: 5, note: "Gửi để khách xem mẫu" },
        { date: "2024-03-12", customer: "Trần Thị B", SKU: "SP003", productName: "Giày thể thao", quantity: 2, note: "Test chất lượng" },
        { date: "2024-03-14", customer: "Lê Văn C", SKU: "SP002", productName: "Quần jean", quantity: 3, note: "Khách yêu cầu gửi mẫu" }
    ],
    cashflow: [
        { date: "2024-03-15", type: "Thu", category: "Bán hàng", amount: 850000, account: "Ngân hàng", description: "Thu từ đơn DH001" },
        { date: "2024-03-16", type: "Chi", category: "Nhập hàng", amount: 2500000, account: "Tiền mặt", description: "Nhập hàng từ nhà cung cấp" },
        { date: "2024-03-16", type: "Thu", category: "Bán hàng", amount: 1200000, account: "Tiền mặt", description: "Thu từ đơn DH002" },
        { date: "2024-03-17", type: "Chi", category: "Chi phí vận hành", amount: 500000, account: "Ngân hàng", description: "Tiền thuê mặt bằng" },
        { date: "2024-03-17", type: "Thu", category: "Bán hàng", amount: 2100000, account: "Ngân hàng", description: "Thu từ đơn DH004" }
    ]
};

// ────────────────────────────────────────────────────────────────
//  3. CẬP NHẬT NGÔN NGỮ
// ────────────────────────────────────────────────────────────────
function updateLanguage() {
    const l = LANGS[currentLang];
    
    // Sidebar
    document.getElementById('sidebar_mainMenu').innerText = l.sidebar.mainMenu;
    document.getElementById('sidebar_operationMenu').innerText = l.sidebar.operationMenu;
    document.getElementById('sidebar_reportMenu').innerText = l.sidebar.reportMenu;
    document.getElementById('sidebar_dashboard').innerText = l.sidebar.dashboard;
    document.getElementById('sidebar_products').innerText = l.sidebar.products;
    document.getElementById('sidebar_orders').innerText = l.sidebar.orders;
    document.getElementById('sidebar_customers').innerText = l.sidebar.customers;
    document.getElementById('sidebar_samples').innerText = l.sidebar.samples;
    document.getElementById('sidebar_cashflow').innerText = l.sidebar.cashflow;
    document.getElementById('sidebar_analytics').innerText = l.sidebar.analytics;

    // Header
    document.getElementById('header_refresh').innerText = l.header.refresh;
    document.getElementById('searchBox').placeholder = l.header.search;

    // Dashboard
    document.getElementById('dashboard_recentOrdersTitle').innerText = l.dashboard.recentOrdersTitle;
    document.getElementById('dashboard_orderID').innerText = l.dashboard.orderID;
    document.getElementById('dashboard_customer').innerText = l.dashboard.customer;
    document.getElementById('dashboard_orderDate').innerText = l.dashboard.orderDate;
    document.getElementById('dashboard_total').innerText = l.dashboard.total;
    document.getElementById('dashboard_status').innerText = l.dashboard.status;
    document.getElementById('dashboard_trendTitle').innerText = l.dashboard.trendTitle;

    // Products
    document.getElementById('products_title').innerText = l.products.title;
    document.getElementById('products_addBtnText').innerText = l.products.addBtnText;
    document.getElementById('products_SKU').innerText = l.products.SKU;
    document.getElementById('products_name').innerText = l.products.name;
    document.getElementById('products_category').innerText = l.products.category;
    document.getElementById('products_price').innerText = l.products.price;
    document.getElementById('products_stock').innerText = l.products.stock;
    document.getElementById('products_status').innerText = l.products.status;
    document.getElementById('products_action').innerText = l.products.action;

    // Orders
    document.getElementById('orders_title').innerText = l.orders.title;
    document.getElementById('orders_orderID').innerText = l.orders.orderID;
    document.getElementById('orders_date').innerText = l.orders.date;
    document.getElementById('orders_customer').innerText = l.orders.customer;
    document.getElementById('orders_total').innerText = l.orders.total;
    document.getElementById('orders_paymentMethod').innerText = l.orders.paymentMethod;
    document.getElementById('orders_status').innerText = l.orders.status;
    document.getElementById('orders_detail').innerText = l.orders.detail;

    // Customers
    document.getElementById('customers_title').innerText = l.customers.title;
    document.getElementById('customers_addBtnText').innerText = l.customers.addBtnText;
    document.getElementById('customers_id').innerText = l.customers.id;
    document.getElementById('customers_name').innerText = l.customers.name;
    document.getElementById('customers_phone').innerText = l.customers.phone;
    document.getElementById('customers_address').innerText = l.customers.address;
    document.getElementById('customers_group').innerText = l.customers.group;
    document.getElementById('customers_totalSpent').innerText = l.customers.totalSpent;
    document.getElementById('customers_debt').innerText = l.customers.debt;

    // Samples
    document.getElementById('samples_title').innerText = l.samples.title;
    document.getElementById('samples_addBtnText').innerText = l.samples.addBtnText;
    document.getElementById('samples_date').innerText = l.samples.date;
    document.getElementById('samples_customer').innerText = l.samples.customer;
    document.getElementById('samples_SKU').innerText = l.samples.SKU;
    document.getElementById('samples_productName').innerText = l.samples.productName;
    document.getElementById('samples_quantity').innerText = l.samples.quantity;
    document.getElementById('samples_note').innerText = l.samples.note;

    // Cashflow
    document.getElementById('cashflow_title').innerText = l.cashflow.title;
    document.getElementById('cashflow_currentBalanceHeader').innerText = l.cashflow.currentBalanceHeader;
    document.getElementById('cashflow_date').innerText = l.cashflow.date;
    document.getElementById('cashflow_type').innerText = l.cashflow.type;
    document.getElementById('cashflow_category').innerText = l.cashflow.category;
    document.getElementById('cashflow_amount').innerText = l.cashflow.amount;
    document.getElementById('cashflow_account').innerText = l.cashflow.account;
    document.getElementById('cashflow_description').innerText = l.cashflow.description;

    // Analytics
    document.getElementById('analytics_title').innerText = l.analytics.title;
    document.getElementById('analytics_developing').innerText = l.analytics.developing;

    // Product modal
    document.getElementById('productModal_title').innerText = l.productModal.title;
    document.getElementById('productModal_nameLabel').innerText = l.productModal.nameLabel;
    document.getElementById('productModal_SKULabel').innerText = l.productModal.SKULabel;
    document.getElementById('productModal_priceLabel').innerText = l.productModal.priceLabel;
    document.getElementById('productModal_statusLabel').innerText = l.productModal.statusLabel;
    document.getElementById('productModal_statusOption1').innerText = l.productModal.statusOption1;
    document.getElementById('productModal_statusOption2').innerText = l.productModal.statusOption2;
    document.getElementById('productModal_cancelBtn').innerText = l.productModal.cancelBtn;
    document.getElementById('productModal_submitBtn').innerText = l.productModal.submitBtn;

    // Sample modal
    document.getElementById('sampleModal_title').innerText = l.sampleModal.title;
    document.getElementById('sampleModal_customerLabel').innerText = l.sampleModal.customerLabel;
    document.getElementById('sampleModal_productLabel').innerText = l.sampleModal.productLabel;
    document.getElementById('sampleModal_quantityLabel').innerText = l.sampleModal.quantityLabel;
    document.getElementById('sampleModal_noteLabel').innerText = l.sampleModal.noteLabel;
    document.getElementById('sampleModal_cancelBtn').innerText = l.sampleModal.cancelBtn;
    document.getElementById('sampleModal_submitBtn').innerText = l.sampleModal.submitBtn;

    // Customer modal
    document.getElementById('customerModal_title').innerText = l.customerModal.title;
    document.getElementById('customerModal_nameLabel').innerText = l.customerModal.nameLabel;
    document.getElementById('customerModal_phoneLabel').innerText = l.customerModal.phoneLabel;
    document.getElementById('customerModal_addressLabel').innerText = l.customerModal.addressLabel;
    document.getElementById('customerModal_groupLabel').innerText = l.customerModal.groupLabel;
    document.getElementById('customerModal_groupOption1').innerText = l.customerModal.groupOption1;
    document.getElementById('customerModal_groupOption2').innerText = l.customerModal.groupOption2;
    document.getElementById('customerModal_groupOption3').innerText = l.customerModal.groupOption3;
    document.getElementById('customerModal_cancelBtn').innerText = l.customerModal.cancelBtn;
    document.getElementById('customerModal_submitBtn').innerText = l.customerModal.submitBtn;

    // Refresh stats cards
    renderStatsCards();
}

// ────────────────────────────────────────────────────────────────
//  4. NAVIGATION (Chuyển trang)
// ────────────────────────────────────────────────────────────────
function switchPage(pageName) {
    // Ẩn tất cả sections
    document.querySelectorAll('.page-section').forEach(sec => sec.style.display = 'none');
    
    // Hiện section được chọn
    const targetSection = document.getElementById(pageName);
    if (targetSection) targetSection.style.display = 'block';

    // Bỏ active khỏi tất cả nav-items
    document.querySelectorAll('.nav-item').forEach(item => item.classList.remove('active'));
    
    // Thêm active vào nav-item được chọn
    const activeNav = document.querySelector(`.nav-item[data-page="${pageName}"]`);
    if (activeNav) activeNav.classList.add('active');

    // Cập nhật title
    const titles = {
        dashboard: LANGS[currentLang].sidebar.dashboard,
        products: LANGS[currentLang].products.title,
        orders: LANGS[currentLang].orders.title,
        customers: LANGS[currentLang].customers.title,
        samples: LANGS[currentLang].samples.title,
        cashflow: LANGS[currentLang].cashflow.title,
        analytics: LANGS[currentLang].analytics.title
    };
    document.getElementById('pageTitle').innerText = titles[pageName] || '';

    // Load dữ liệu cho trang
    loadPageData(pageName);
}

// ────────────────────────────────────────────────────────────────
//  5. LOAD DỮ LIỆU CHO TỪNG TRANG
// ────────────────────────────────────────────────────────────────
function loadPageData(pageName) {
    switch(pageName) {
        case 'dashboard':
            renderDashboard();
            break;
        case 'products':
            renderProductsTable();
            break;
        case 'orders':
            renderOrdersTable();
            break;
        case 'customers':
            renderCustomersTable();
            break;
        case 'samples':
            renderSamplesTable();
            break;
        case 'cashflow':
            renderCashflowTable();
            break;
    }
}

// ────────────────────────────────────────────────────────────────
//  6. RENDER DASHBOARD
// ────────────────────────────────────────────────────────────────
function renderStatsCards() {
    const l = LANGS[currentLang].stats;
    const statsGrid = document.querySelector('.stats-grid');
    
    const totalRevenue = mockData.cashflow
        .filter(t => t.type === 'Thu')
        .reduce((sum, t) => sum + t.amount, 0);
    
    statsGrid.innerHTML = `
        <div class="stat-card">
            <div class="stat-icon revenue">
                <i data-lucide="trending-up"></i>
            </div>
            <div class="stat-content">
                <h3>${totalRevenue.toLocaleString()}đ</h3>
                <p>${l.revenue}</p>
            </div>
        </div>
        <div class="stat-card">
            <div class="stat-icon orders">
                <i data-lucide="shopping-bag"></i>
            </div>
            <div class="stat-content">
                <h3>${mockData.orders.length}</h3>
                <p>${l.orders}</p>
            </div>
        </div>
        <div class="stat-card">
            <div class="stat-icon products">
                <i data-lucide="box"></i>
            </div>
            <div class="stat-content">
                <h3>${mockData.products.length}</h3>
                <p>${l.products}</p>
            </div>
        </div>
        <div class="stat-card">
            <div class="stat-icon customers">
                <i data-lucide="user-check"></i>
            </div>
            <div class="stat-content">
                <h3>${mockData.customers.length}</h3>
                <p>${l.customers}</p>
            </div>
        </div>
    `;
    
    // Re-init Lucide icons
    if (typeof lucide !== 'undefined') lucide.createIcons();
}

function renderDashboard() {
    renderStatsCards();
    
    // Render recent orders
    const tbody = document.getElementById('recentOrdersTableBody');
    tbody.innerHTML = mockData.orders.slice(0, 5).map(order => `
        <tr>
            <td><strong>${order.id}</strong></td>
            <td>${order.customer}</td>
            <td>${order.date}</td>
            <td><strong>${order.total.toLocaleString()}đ</strong></td>
            <td><span class="badge ${order.status === 'Hoàn thành' ? 'badge-success' : 'badge-warning'}">${order.status}</span></td>
        </tr>
    `).join('');

    // Render revenue chart
    renderRevenueChart();
}

function renderRevenueChart() {
    const ctx = document.getElementById('dashboardRevenueChart');
    if (!ctx) return;

    // Destroy existing chart if any
    if (window.revenueChart) window.revenueChart.destroy();

    const labels = ['T1', 'T2', 'T3', 'T4', 'T5', 'T6', 'T7'];
    const data = [1200000, 1900000, 1500000, 2200000, 1800000, 2400000, 2100000];

    window.revenueChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: labels,
            datasets: [{
                label: 'Doanh thu',
                data: data,
                borderColor: '#6366f1',
                backgroundColor: 'rgba(99, 102, 241, 0.1)',
                tension: 0.4,
                fill: true
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: { display: false }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    ticks: {
                        callback: function(value) {
                            return (value / 1000000).toFixed(1) + 'M';
                        }
                    }
                }
            }
        }
    });
}

// ────────────────────────────────────────────────────────────────
//  7. RENDER TABLES
// ────────────────────────────────────────────────────────────────
function renderProductsTable() {
    const tbody = document.getElementById('productsTableBody');
    tbody.innerHTML = mockData.products.map(p => `
        <tr>
            <td><strong>${p.SKU}</strong></td>
            <td>${p.name}</td>
            <td>${p.category}</td>
            <td><strong>${p.price.toLocaleString()}đ</strong></td>
            <td>${p.stock}</td>
            <td><span class="badge ${p.status === 'Đang bán' ? 'badge-success' : 'badge-danger'}">${p.status}</span></td>
            <td>
                <button class="btn btn-sm btn-secondary">
                    <i data-lucide="edit-2"></i>
                </button>
            </td>
        </tr>
    `).join('');
    
    if (typeof lucide !== 'undefined') lucide.createIcons();
}

function renderOrdersTable() {
    const tbody = document.getElementById('ordersTableBody');
    tbody.innerHTML = mockData.orders.map(o => `
        <tr>
            <td><strong>${o.id}</strong></td>
            <td>${o.date}</td>
            <td>${o.customer}</td>
            <td><strong>${o.total.toLocaleString()}đ</strong></td>
            <td>${o.payment}</td>
            <td><span class="badge ${o.status === 'Hoàn thành' ? 'badge-success' : 'badge-warning'}">${o.status}</span></td>
            <td>
                <button class="btn btn-sm btn-secondary">
                    <i data-lucide="eye"></i>
                </button>
            </td>
        </tr>
    `).join('');
    
    if (typeof lucide !== 'undefined') lucide.createIcons();
}

function renderCustomersTable() {
    const tbody = document.getElementById('customersTableBody');
    tbody.innerHTML = mockData.customers.map(c => `
        <tr>
            <td><strong>${c.id}</strong></td>
            <td>${c.name}</td>
            <td>${c.phone}</td>
            <td>${c.address}</td>
            <td><span class="badge ${c.group === 'VIP' ? 'badge-success' : 'badge-warning'}">${c.group}</span></td>
            <td><strong>${c.totalSpent.toLocaleString()}đ</strong></td>
            <td style="color: ${c.debt > 0 ? 'var(--danger)' : 'var(--success)'}"><strong>${c.debt.toLocaleString()}đ</strong></td>
        </tr>
    `).join('');
}

function renderSamplesTable() {
    const tbody = document.getElementById('samplesTableBody');
    tbody.innerHTML = mockData.samples.map(s => `
        <tr>
            <td>${s.date}</td>
            <td>${s.customer}</td>
            <td><strong>${s.SKU}</strong></td>
            <td>${s.productName}</td>
            <td>${s.quantity}</td>
            <td>${s.note}</td>
        </tr>
    `).join('');
}

function renderCashflowTable() {
    const tbody = document.getElementById('cashflowTableBody');
    const totalIncome = mockData.cashflow.filter(t => t.type === 'Thu').reduce((sum, t) => sum + t.amount, 0);
    const totalExpense = mockData.cashflow.filter(t => t.type === 'Chi').reduce((sum, t) => sum + t.amount, 0);
    const balance = totalIncome - totalExpense;
    
    document.getElementById('currentBalance').innerText = balance.toLocaleString() + 'đ';
    
    tbody.innerHTML = mockData.cashflow.map(t => `
        <tr>
            <td>${t.date}</td>
            <td><span class="badge ${t.type === 'Thu' ? 'badge-success' : 'badge-danger'}">${t.type}</span></td>
            <td>${t.category}</td>
            <td style="color: ${t.type === 'Thu' ? 'var(--success)' : 'var(--danger)'}"><strong>${t.amount.toLocaleString()}đ</strong></td>
            <td>${t.account}</td>
            <td>${t.description}</td>
        </tr>
    `).join('');
}

// ────────────────────────────────────────────────────────────────
//  8. MODAL HANDLING
// ────────────────────────────────────────────────────────────────
function openModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) modal.style.display = 'flex';
    
    // Load dropdown data for sample modal
    if (modalId === 'sampleModal') {
        loadSampleModalData();
    }
}

function closeModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.style.display = 'none';
        // Reset form
        const form = modal.querySelector('form');
        if (form) form.reset();
    }
}

function loadSampleModalData() {
    // Load customers
    const customerSelect = document.getElementById('sampleCustomer');
    customerSelect.innerHTML = mockData.customers.map(c => 
        `<option value="${c.id}">${c.name}</option>`
    ).join('');
    
    // Load products
    const productSelect = document.getElementById('sampleSKU');
    productSelect.innerHTML = mockData.products.map(p => 
        `<option value="${p.SKU}">${p.SKU} - ${p.name}</option>`
    ).join('');
}

// ────────────────────────────────────────────────────────────────
//  9. FORM SUBMISSIONS
// ────────────────────────────────────────────────────────────────
function handleProductFormSubmit(e) {
    e.preventDefault();
    
    const newProduct = {
        SKU: document.getElementById('productSKU').value,
        name: document.getElementById('productName').value,
        category: 'Mới',
        price: parseInt(document.getElementById('productSalePrice').value),
        stock: 0,
        status: document.getElementById('productStatus').value
    };
    
    mockData.products.push(newProduct);
    renderProductsTable();
    closeModal('productModal');
    showNotification('Thêm sản phẩm thành công!', 'success');
}

function handleSampleFormSubmit(e) {
    e.preventDefault();
    
    const customer = mockData.customers.find(c => c.id === document.getElementById('sampleCustomer').value);
    const productSKU = document.getElementById('sampleSKU').value;
    const product = mockData.products.find(p => p.SKU === productSKU);
    
    const newSample = {
        date: new Date().toISOString().split('T')[0],
        customer: customer.name,
        SKU: productSKU,
        productName: product.name,
        quantity: parseInt(document.getElementById('sampleQuantity').value),
        note: document.getElementById('sampleNote').value
    };
    
    mockData.samples.push(newSample);
    renderSamplesTable();
    closeModal('sampleModal');
    showNotification('Gửi hàng mẫu thành công!', 'success');
}

function handleCustomerFormSubmit(e) {
    e.preventDefault();
    
    const newCustomer = {
        id: 'KH' + String(mockData.customers.length + 1).padStart(3, '0'),
        name: document.getElementById('customerName').value,
        phone: document.getElementById('customerPhone').value,
        address: document.getElementById('customerAddress').value,
        group: document.getElementById('customerGroup').value,
        totalSpent: 0,
        debt: 0
    };
    
    mockData.customers.push(newCustomer);
    renderCustomersTable();
    closeModal('customerModal');
    showNotification('Thêm khách hàng thành công!', 'success');
}

// ────────────────────────────────────────────────────────────────
//  10. NOTIFICATIONS
// ────────────────────────────────────────────────────────────────
function showNotification(message, type = 'info') {
    const notif = document.createElement('div');
    notif.className = `notification notification-${type} show`;
    notif.innerHTML = `
        <i data-lucide="${type === 'success' ? 'check-circle' : 'alert-circle'}"></i>
        <span>${message}</span>
    `;
    document.body.appendChild(notif);
    
    if (typeof lucide !== 'undefined') lucide.createIcons();
    
    setTimeout(() => {
        notif.classList.remove('show');
        setTimeout(() => notif.remove(), 400);
    }, 3000);
}

// ────────────────────────────────────────────────────────────────
//  11. INITIALIZATION
// ────────────────────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM Loaded - Initializing...');
    
    // Initialize Lucide icons
    if (typeof lucide !== 'undefined') {
        lucide.createIcons();
        console.log('Lucide icons initialized');
    }

    // Set current date
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    const currentDateEl = document.getElementById('currentDate');
    if (currentDateEl) {
        currentDateEl.innerText = new Date().toLocaleDateString('vi-VN', options);
    }

    // Language switcher
    const langSwitcher = document.getElementById('languageSwitcher');
    if (langSwitcher) {
        langSwitcher.addEventListener('change', function() {
            currentLang = this.value;
            updateLanguage();
            console.log('Language changed to:', currentLang);
        });
    }

    // Navigation - FIX: Thêm log và check elements
    const navItems = document.querySelectorAll('.nav-item');
    console.log('Found nav items:', navItems.length);
    
    navItems.forEach((item, index) => {
        console.log(`Nav item ${index}:`, item.getAttribute('data-page'));
        item.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            const pageName = this.getAttribute('data-page');
            console.log('Clicked nav item:', pageName);
            if (pageName) {
                switchPage(pageName);
            }
        });
        // Đảm bảo cursor pointer
        item.style.cursor = 'pointer';
    });

    // Refresh button
    const refreshBtn = document.getElementById('refreshBtn');
    if (refreshBtn) {
        refreshBtn.addEventListener('click', () => {
            const activeNav = document.querySelector('.nav-item.active');
            if (activeNav) {
                const currentPage = activeNav.getAttribute('data-page');
                loadPageData(currentPage);
                showNotification('Dữ liệu đã được cập nhật', 'success');
            }
        });
    }

    // Modal triggers
    const addProductBtn = document.getElementById('addProductBtn');
    const addSampleBtn = document.getElementById('addSampleBtn');
    const addCustomerBtn = document.getElementById('addCustomerBtn');
    
    if (addProductBtn) {
        addProductBtn.addEventListener('click', () => openModal('productModal'));
    }
    if (addSampleBtn) {
        addSampleBtn.addEventListener('click', () => openModal('sampleModal'));
    }
    if (addCustomerBtn) {
        addCustomerBtn.addEventListener('click', () => openModal('customerModal'));
    }

    // Form submissions
    const productForm = document.getElementById('productForm');
    const sampleForm = document.getElementById('sampleForm');
    const customerForm = document.getElementById('customerForm');
    
    if (productForm) {
        productForm.addEventListener('submit', handleProductFormSubmit);
    }
    if (sampleForm) {
        sampleForm.addEventListener('submit', handleSampleFormSubmit);
    }
    if (customerForm) {
        customerForm.addEventListener('submit', handleCustomerFormSubmit);
    }

    // Close modals on outside click
    document.querySelectorAll('.modal').forEach(modal => {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                closeModal(modal.id);
            }
        });
    });

    // Initial load
    console.log('Loading initial language and page...');
    updateLanguage();
    switchPage('dashboard');
    console.log('Initialization complete!');
});
