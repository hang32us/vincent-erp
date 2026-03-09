/**
 * ════════════════════════════════════════════════════════════════
 * NEXUS ERP - MAIN APPLICATION LOGIC
 * Version: 3.5 Ultimate Professional
 * ════════════════════════════════════════════════════════════════
 */

const CONFIG = {
    API_URL: "https://script.google.com/macros/s/AKfycbxGaVvaSVSpUiW3BXVKdOQ3-g2XXbtQP-u830UZUT4eFaSgyySFlVU1vkINDb8goho/exec",
    REFRESH_INTERVAL: 60000,
};

const state = {
    currentPage: 'dashboard',
    charts: {},
    cache: {},
    cacheDuration: 300000 // 5 minutes in milliseconds
};

document.addEventListener('DOMContentLoaded', () => {
    initNavigation();
    initDateTime();
    initHandlers();
    navigateTo('dashboard');
    lucide.createIcons();
});

function initDateTime() {
    const update = () => {
        const now = new Date();
        const dateStr = now.toLocaleDateString('vi-VN', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
        const timeStr = now.toLocaleTimeString('vi-VN');
        const elem = document.getElementById('currentDate');
        if (elem) elem.innerText = `${dateStr} | ${timeStr}`;
    };
    update();
    setInterval(update, 1000);
}

function initNavigation() {
    document.querySelectorAll('.nav-item').forEach(item => {
        item.addEventListener('click', () => {
            const page = item.getAttribute('data-page');
            if (page) navigateTo(page);
        });
    });
}

function navigateTo(page) {
    state.currentPage = page;
    document.querySelectorAll('.nav-item').forEach(i => i.classList.remove('active'));
    const activeNav = document.querySelector(`.nav-item[data-page="${page}"]`);
    if (activeNav) activeNav.classList.add('active');

    const titleMap = {
        dashboard: 'Tổng quan hệ thống',
        products: 'Quản lý kho sản phẩm',
        orders: 'Quản lý đơn hàng',
        customers: 'Dữ liệu khách hàng',
        inventory: 'Kiểm kê kho hàng',
        samples: 'Hàng mẫu gửi đối tác',
        analytics: 'Báo cáo & Phân tích',
        cashflow: 'Quản lý dòng tiền'
    };
    document.getElementById('pageTitle').innerText = titleMap[page] || 'Trang chủ';

    document.querySelectorAll('.page-section').forEach(s => s.style.display = 'none');
    const target = document.getElementById(page);
    if (target) target.style.display = 'block';

    loadPageData(page);
    lucide.createIcons();
}

async function callAPI(action, method = 'POST', data = null, useCache = false) {
    const cacheKey = action + (data ? JSON.stringify(data) : '');

    // Trả về dữ liệu từ bộ nhớ đệm nếu còn mới (dưới 5 phút)
    if (useCache && state.cache[cacheKey] && (Date.now() - state.cache[cacheKey].timestamp < state.cacheDuration)) {
        console.log('Using cache for:', action);
        return state.cache[cacheKey].data;
    }

    showLoading(true);
    try {
        const url = CONFIG.API_URL;
        const options = {
            method: 'POST',
            mode: 'cors',
            headers: { 'Content-Type': 'text/plain;charset=utf-8' },
            body: JSON.stringify({ action, ...data })
        };

        const response = await fetch(url, options);
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);

        const result = await response.json();
        if (!result.success) throw new Error(result.error || 'Server error');

        // Lưu vào bộ nhớ đệm cho các tác vụ lấy dữ liệu (GET)
        if (action.startsWith('get')) {
            state.cache[cacheKey] = {
                data: result,
                timestamp: Date.now()
            };
        }

        return result;
    } catch (error) {
        console.error('API Error:', error);
        let errorMsg = 'Lỗi kết nối máy chủ.';
        if (error.message.includes('fetch')) {
            errorMsg = 'Không thể kết nối! Vui lòng kiểm tra lại URL API hoặc kết nối mạng.';
        } else {
            errorMsg += ' ' + error.message;
        }
        showNotification(errorMsg, 'error');
        return { success: false };
    } finally {
        showLoading(false);
    }
}

/**
 * Xóa bộ nhớ đệm khi dữ liệu thay đổi
 */
function invalidateCache(pattern) {
    Object.keys(state.cache).forEach(key => {
        if (key.includes(pattern)) delete state.cache[key];
    });
}

function loadPageData(page) {
    switch (page) {
        case 'dashboard': loadDashboardData(); break;
        case 'products': loadProductsData(); break;
        case 'orders': loadOrdersData(); break;
        case 'customers': loadCustomersData(); break;
        case 'inventory': loadInventoryData(); break;
        case 'samples': loadSamplesData(); break;
        case 'analytics': loadAnalyticsData(); break;
        case 'cashflow': loadCashFlowData(); break;
    }
}

// ═══════════════════════════════════════════════════════════════
// DATA LOADERS
// ═══════════════════════════════════════════════════════════════

async function loadDashboardData(useCache = true) {
    const res = await callAPI('getDashboard', 'POST', null, useCache);
    if (!res.success) return;

    animateValue('totalRevenue', 0, res.revenue || 0, 1000, true);
    document.getElementById('totalOrders').innerText = res.ordersCount || 0;
    document.getElementById('totalProducts').innerText = res.totalProducts || 0;
    document.getElementById('totalCustomers').innerText = res.customersCount || 0;

    renderRecentOrders(res.recentOrders || []);
    renderDashboardChart(res.revenueTrend || []);
}

async function loadProductsData(useCache = true) {
    const res = await callAPI('getProducts', 'POST', null, useCache);
    if (!res.success) return;

    const tbody = document.getElementById('productsTableBody');
    tbody.innerHTML = res.products.map(p => `
        <tr>
            <td style="font-weight:700; color:var(--primary)">${p.sku}</td>
            <td style="font-weight:600">${p.name}</td>
            <td><span class="badge badge-warning">${p.category || 'Chưa phân loại'}</span></td>
            <td style="font-weight:700">${formatCurrency(p.salePrice)}</td>
            <td style="font-weight:800; color:${p.stock < 10 ? 'var(--danger)' : 'var(--success)'}">${p.stock}</td>
            <td><span class="badge ${p.status === 'Đang bán' ? 'badge-success' : 'badge-danger'}">${p.status}</span></td>
            <td>
                <button class="btn btn-sm btn-secondary" onclick="editProduct('${p.sku}')"><i data-lucide="edit-3"></i></button>
            </td>
        </tr>
    `).join('');
    lucide.createIcons();
}

async function loadOrdersData(useCache = true) {
    const res = await callAPI('getOrders', 'POST', null, useCache);
    if (!res.success) return;
    const tbody = document.getElementById('ordersTableBody');
    tbody.innerHTML = res.orders.map(o => `
        <tr>
            <td style="font-weight:700">#${o.id}</td>
            <td>${new Date(o.date).toLocaleDateString('vi-VN')}</td>
            <td>${o.customer}</td>
            <td style="font-weight:700">${formatCurrency(o.total)}</td>
            <td>${o.paymentMethod}</td>
            <td><span class="badge badge-success">${o.status}</span></td>
            <td><button class="btn btn-sm btn-secondary"><i data-lucide="eye"></i></button></td>
        </tr>
    `).join('');
    lucide.createIcons();
}

async function loadCustomersData(useCache = true) {
    const res = await callAPI('getCustomers', 'POST', null, useCache);
    if (!res.success) return;
    const tbody = document.getElementById('customersTableBody');
    tbody.innerHTML = res.customers.map(c => `
        <tr>
            <td style="font-weight:700">${c.id}</td>
            <td style="font-weight:600">${c.name}</td>
            <td>${c.phone}</td>
            <td>${c.address || ''}</td>
            <td><span class="badge badge-info">${c.group}</span></td>
            <td style="font-weight:700">${formatCurrency(c.totalSpent)}</td>
            <td style="font-weight:700; color:${c.debt > 0 ? 'var(--danger)' : 'inherit'}">${formatCurrency(c.debt)}</td>
            <td>
                <button class="btn btn-sm btn-secondary" onclick="showNotification('Tính năng đang phát triển', 'info')"><i data-lucide="edit-2"></i></button>
            </td>
        </tr>
    `).join('');
    lucide.createIcons();
}

async function loadInventoryData(useCache = true) {
    const res = await callAPI('getProducts', 'POST', null, useCache);
    if (!res.success) return;

    let totalVal = 0;
    let lowStock = 0;
    const tbody = document.getElementById('inventoryTableBody');
    tbody.innerHTML = res.products.map(p => {
        const val = p.stock * p.costPrice;
        totalVal += val;
        if (p.stock < 10) lowStock++;
        return `
            <tr>
                <td style="font-weight:700">${p.sku}</td>
                <td>${p.name}</td>
                <td style="font-weight:700">${p.stock}</td>
                <td style="font-weight:700">${formatCurrency(val)}</td>
                <td><span class="badge ${p.stock > 0 ? 'badge-success' : 'badge-danger'}">${p.stock > 0 ? 'Còn hàng' : 'Hết hàng'}</span></td>
            </tr>
        `;
    }).join('');

    document.getElementById('totalInventoryValue').innerText = formatCurrency(totalVal);
    document.getElementById('lowStockCount').innerText = lowStock;
    lucide.createIcons();
}

async function loadSamplesData(useCache = true) {
    const res = await callAPI('getSamples', 'POST', null, useCache);
    if (!res.success) return;
    const tbody = document.getElementById('samplesTableBody');
    tbody.innerHTML = res.samples.reverse().map(s => `
        <tr>
            <td>${new Date(s.date).toLocaleDateString('vi-VN')}</td>
            <td style="font-weight:600">${s.customer}</td>
            <td>${s.productName} (${s.sku})</td>
            <td style="font-weight:700">${s.quantity}</td>
            <td style="font-style:italic; color:var(--text-muted)">${s.note || ''}</td>
        </tr>
    `).join('');
}

async function loadCashFlowData(useCache = true) {
    const res = await callAPI('getCashFlow', 'POST', null, useCache);
    if (!res.success) return;
    const tbody = document.getElementById('cashflowTableBody');
    tbody.innerHTML = res.transactions.reverse().map(t => `
        <tr>
            <td>${new Date(t.date).toLocaleDateString('vi-VN')}</td>
            <td><span class="badge ${t.type === 'Thu' ? 'badge-success' : 'badge-danger'}">${t.type}</span></td>
            <td>${t.category}</td>
            <td style="font-weight:700; color:${t.type === 'Thu' ? 'var(--success)' : 'var(--danger)'}">${formatCurrency(t.amount)}</td>
            <td>${t.account}</td>
            <td>${t.description}</td>
        </tr>
    `).join('');
    document.getElementById('currentBalance').innerText = formatCurrency(res.balance || 0);
}

// ═══════════════════════════════════════════════════════════════
// HANDLERS
// ═══════════════════════════════════════════════════════════════

function initHandlers() {
    document.getElementById('refreshBtn').addEventListener('click', () => {
        invalidateCache(state.currentPage); // Xóa cache trang hiện tại
        loadPageData(state.currentPage);    // Tải mới
        showNotification('Đã cập nhật dữ liệu mới nhất.', 'info');
    });

    document.getElementById('addProductBtn').addEventListener('click', () => openModal('productModal'));

    document.getElementById('productForm').addEventListener('submit', async (e) => {
        e.preventDefault();
        const data = {
            name: document.getElementById('productName').value,
            sku: document.getElementById('productSKU').value,
            salePrice: document.getElementById('productSalePrice').value,
            status: document.getElementById('productStatus').value
        };
        const res = await callAPI('createProduct', 'POST', data);
        if (res.success) {
            invalidateCache('getProducts'); // Xóa cache liên quan
            invalidateCache('getDashboard');
            showNotification('Thêm sản phẩm thành công!', 'success');
            closeModal('productModal');
            loadProductsData(false); // Buộc tải mới
        }
    });

    document.getElementById('addSampleBtn').addEventListener('click', async () => {
        const productSelect = document.getElementById('sampleSKU');
        const customerSelect = document.getElementById('sampleCustomer');

        productSelect.innerHTML = '<option>Đang tải...</option>';
        customerSelect.innerHTML = '<option>Đang tải...</option>';

        openModal('sampleModal');

        // Tải từ cache nếu có để mở modal nhanh
        const [prodRes, custRes] = await Promise.all([
            callAPI('getProducts', 'POST', null, true),
            callAPI('getCustomers', 'POST', null, true)
        ]);

        if (prodRes.success) {
            productSelect.innerHTML = prodRes.products.map(p =>
                `<option value="${p.sku}">${p.name} (${p.sku}) - Tồn: ${p.stock}</option>`
            ).join('');
        }

        if (custRes.success) {
            customerSelect.innerHTML = '<option value="">-- Chọn khách hàng --</option>' +
                custRes.customers.map(c => `<option value="${c.name}">${c.name} (${c.phone})</option>`).join('');
        }
    });

    document.getElementById('sampleForm').addEventListener('submit', async (e) => {
        e.preventDefault();
        const data = {
            customer: document.getElementById('sampleCustomer').value,
            sku: document.getElementById('sampleSKU').value,
            quantity: document.getElementById('sampleQuantity').value,
            note: document.getElementById('sampleNote').value
        };
        const res = await callAPI('createSample', 'POST', data);
        if (res.success) {
            invalidateCache('getSamples');
            showNotification('Gửi hàng mẫu thành công!', 'success');
            closeModal('sampleModal');
            loadSamplesData(false);
        }
    });

    // Add Customer
    document.getElementById('addCustomerBtn').addEventListener('click', () => openModal('customerModal'));

    document.getElementById('customerForm').addEventListener('submit', async (e) => {
        e.preventDefault();
        const data = {
            name: document.getElementById('customerName').value,
            phone: document.getElementById('customerPhone').value,
            address: document.getElementById('customerAddress').value,
            group: document.getElementById('customerGroup').value
        };
        const res = await callAPI('createCustomer', 'POST', data);
        if (res.success) {
            invalidateCache('getCustomers');
            invalidateCache('getDashboard');
            showNotification('Thêm khách hàng thành công!', 'success');
            closeModal('customerModal');
            loadCustomersData(false);
        }
    });
}

// ═══════════════════════════════════════════════════════════════
// UTILS
// ═══════════════════════════════════════════════════════════════

function openModal(id) { document.getElementById(id).style.display = 'flex'; }
function closeModal(id) { document.getElementById(id).style.display = 'none'; }
function showLoading(show) { document.getElementById('loadingOverlay').style.display = show ? 'flex' : 'none'; }

function showNotification(msg, type) {
    const toast = document.createElement('div');
    toast.className = `notification show notification-${type}`;
    toast.innerHTML = `<i data-lucide="${type === 'success' ? 'check-circle' : 'alert-circle'}"></i><span>${msg}</span>`;
    document.body.appendChild(toast);
    lucide.createIcons();
    setTimeout(() => {
        toast.classList.remove('show');
        setTimeout(() => toast.remove(), 500);
    }, 3000);
}

function formatCurrency(val) {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(val);
}

function animateValue(id, start, end, duration, isCurrency = false) {
    const obj = document.getElementById(id);
    if (!obj) return;
    let startTimestamp = null;
    const step = (timestamp) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = Math.min((timestamp - startTimestamp) / duration, 1);
        const val = Math.floor(progress * (end - start) + start);
        obj.innerHTML = isCurrency ? formatCurrency(val) : val;
        if (progress < 1) window.requestAnimationFrame(step);
    };
    window.requestAnimationFrame(step);
}

function renderDashboardChart(trend) {
    const canvas = document.getElementById('dashboardRevenueChart');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (state.charts.revenue) state.charts.revenue.destroy();
    state.charts.revenue = new Chart(ctx, {
        type: 'line',
        data: {
            labels: trend.map(t => t.date),
            datasets: [{
                data: trend.map(t => t.value),
                borderColor: '#6366f1',
                backgroundColor: 'rgba(99, 102, 241, 0.1)',
                fill: true,
                tension: 0.4,
                pointRadius: 4,
                pointBackgroundColor: '#fff',
                pointBorderWidth: 2
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: { legend: { display: false } },
            scales: { y: { display: false }, x: { grid: { display: false } } }
        }
    });
}

function renderRecentOrders(orders) {
    const tbody = document.getElementById('recentOrdersTableBody');
    if (!tbody) return;
    if (orders.length === 0) {
        tbody.innerHTML = '<tr><td colspan="5" style="text-align:center; padding:40px">Chưa có dữ liệu</td></tr>';
        return;
    }
    tbody.innerHTML = orders.slice(0, 5).map(o => `
        <tr>
            <td style="font-weight:700">#${o.id}</td>
            <td>${o.customer}</td>
            <td>${new Date(o.date).toLocaleDateString('vi-VN')}</td>
            <td style="font-weight:700">${formatCurrency(o.total)}</td>
            <td><span class="badge badge-success">${o.status}</span></td>
        </tr>
    `).join('');
}

window.closeModal = closeModal;
window.editProduct = (sku) => showNotification(`Chỉnh sửa ${sku} - Liên hệ Admin`, 'info');

