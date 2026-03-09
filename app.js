// Định nghĩa các nhãn Tiếng Việt & Tiếng Trung
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

// Hàm Việt hóa/Trung hóa toàn bộ giao diện
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
    document.getElementById('pageTitle').innerText = l.dashboard.recentOrdersTitle;
    document.getElementById('dashboard_recentOrdersTitle').innerText = l.dashboard.recentOrdersTitle;
    document.getElementById('dashboard_orderID').innerText = l.dashboard.orderID;
    document.getElementById('dashboard_customer').innerText = l.dashboard.customer;
    document.getElementById('dashboard_orderDate').innerText = l.dashboard.orderDate;
    document.getElementById('dashboard_total').innerText = l.dashboard.total;
    document.getElementById('dashboard_status').innerText = l.dashboard.status;
    document.getElementById('dashboard_loading').innerText = l.dashboard.loading;
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
    document.getElementById('products_loading').innerText = l.products.loading;

    // Orders
    document.getElementById('orders_title').innerText = l.orders.title;
    document.getElementById('orders_orderID').innerText = l.orders.orderID;
    document.getElementById('orders_date').innerText = l.orders.date;
    document.getElementById('orders_customer').innerText = l.orders.customer;
    document.getElementById('orders_total').innerText = l.orders.total;
    document.getElementById('orders_paymentMethod').innerText = l.orders.paymentMethod;
    document.getElementById('orders_status').innerText = l.orders.status;
    document.getElementById('orders_detail').innerText = l.orders.detail;
    document.getElementById('orders_loading').innerText = l.orders.loading;

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
    document.getElementById('customers_loading').innerText = l.customers.loading;

    // Samples
    document.getElementById('samples_title').innerText = l.samples.title;
    document.getElementById('samples_addBtnText').innerText = l.samples.addBtnText;
    document.getElementById('samples_date').innerText = l.samples.date;
    document.getElementById('samples_customer').innerText = l.samples.customer;
    document.getElementById('samples_SKU').innerText = l.samples.SKU;
    document.getElementById('samples_productName').innerText = l.samples.productName;
    document.getElementById('samples_quantity').innerText = l.samples.quantity;
    document.getElementById('samples_note').innerText = l.samples.note;
    document.getElementById('samples_loading').innerText = l.samples.loading;

    // Cashflow
    document.getElementById('cashflow_title').innerText = l.cashflow.title;
    document.getElementById('cashflow_currentBalanceHeader').innerText = l.cashflow.currentBalanceHeader;
    document.getElementById('cashflow_date').innerText = l.cashflow.date;
    document.getElementById('cashflow_type').innerText = l.cashflow.type;
    document.getElementById('cashflow_category').innerText = l.cashflow.category;
    document.getElementById('cashflow_amount').innerText = l.cashflow.amount;
    document.getElementById('cashflow_account').innerText = l.cashflow.account;
    document.getElementById('cashflow_description').innerText = l.cashflow.description;
    document.getElementById('cashflow_loading').innerText = l.cashflow.loading;

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
    document.getElementById('sampleModal_loadingCustomer').innerText = l.sampleModal.loadingCustomer;
    document.getElementById('sampleModal_loadingProduct').innerText = l.sampleModal.loadingProduct;
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
}

// Gắn event cho switch ngôn ngữ
document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('languageSwitcher').addEventListener('change', function() {
        currentLang = this.value;
        updateLanguage();
    });
    updateLanguage(); // Giao diện mặc định là tiếng Việt khi load lần đầu
});