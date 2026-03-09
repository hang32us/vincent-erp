/**
 * ════════════════════════════════════════════════════════════════
 * NEXUS ERP - MAIN APPLICATION LOGIC (OPTIMIZED VERSION)
 * Version: 3.6 Speed Optimized
 * ════════════════════════════════════════════════════════════════
 */

const CONFIG = {
    API_URL: "https://script.google.com/macros/s/AKfycbzkO9loxXb7XKpgqZYlMx2eRFBdLQ43qa4lxnK-B4t7Juz9zoGQqtwbo3BX7udbL5o/exec",
    REFRESH_INTERVAL: 60000,
};

const state = {
    currentPage: 'dashboard',
    charts: {},
    cache: {},
    cacheDuration: 300000, // 5 minutes
    dataLoaded: {}, // Track which pages have been loaded
    prefetchQueue: ['products', 'customers'] // Prefetch these pages
};

document.addEventListener('DOMContentLoaded', () => {
    initNavigation();
    initDateTime();
    initHandlers();
    navigateTo('dashboard');
    lucide.createIcons();
    
    // Prefetch common pages in background after 2 seconds
    setTimeout(() => prefetchData(), 2000);
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

// ═══════════════════════════════════════════════════════════════
// OPTIMIZED NAVIGATION - INSTANT SWITCHING
// ═══════════════════════════════════════════════════════════════

function navigateTo(page) {
    state.currentPage = page;
    
    // 1. UPDATE UI IMMEDIATELY (no waiting for data)
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

    // 2. SWITCH SECTIONS INSTANTLY
    document.querySelectorAll('.page-section').forEach(s => s.style.display = 'none');
    const target = document.getElementById(page);
    if (target) target.style.display = 'block';

    // 3. LOAD DATA (use cache if available, show skeleton while loading)
    loadPageDataOptimized(page);
    
    // 4. RENDER ICONS ONLY FOR VISIBLE SECTION (faster)
    setTimeout(() => {
        if (target) {
            const icons = target.querySelectorAll('[data-lucide]');
            icons.forEach(icon => {
                const iconName = icon.getAttribute('data-lucide');
                if (iconName && !icon.querySelector('svg')) {
                    lucide.createIcons({ attrs: { 'data-lucide': iconName } });
                }
            });
        }
    }, 0);
}

// ═══════════════════════════════════════════════════════════════
// OPTIMIZED DATA LOADING WITH CACHE & SKELETON
// ═══════════════════════════════════════════════════════════════

function loadPageDataOptimized(page) {
    // Check if data already loaded and cached
    if (state.dataLoaded[page] && isCacheValid(page)) {
        console.log(`✅ Using cached data for ${page}`);
        return; // Don't reload, use existing DOM
    }

    // Show skeleton/loading state
    showSkeletonForPage(page);

    // Load data with cache
    switch (page) {
        case 'dashboard': 
            loadDashboardData(true); 
            break;
        case 'products': 
            loadProductsData(true); 
            break;
        case 'orders': 
            loadOrdersData(true); 
            break;
        case 'customers': 
            loadCustomersData(true); 
            break;
        case 'samples': 
            loadSamplesData(true); 
            break;
        case 'cashflow': 
            loadCashFlowData(true); 
            break;
    }
}

function isCacheValid(page) {
    const cacheKey = `get${page.charAt(0).toUpperCase() + page.slice(1)}`;
    const cached = state.cache[cacheKey];
    if (!cached) return false;
    return (Date.now() - cached.timestamp) < state.cacheDuration;
}

function showSkeletonForPage(page) {
    // Show loading skeleton instead of "Dang tai..."
    const skeletons = {
        products: `
            <tr><td colspan="7">
                <div class="skeleton-loader">
                    <div class="skeleton-line"></div>
                    <div class="skeleton-line"></div>
                    <div class="skeleton-line"></div>
                </div>
            </td></tr>
        `,
        orders: `<tr><td colspan="7"><div class="skeleton-loader"><div class="skeleton-line"></div></div></td></tr>`,
        customers: `<tr><td colspan="7"><div class="skeleton-loader"><div class="skeleton-line"></div></div></td></tr>`,
    };
    
    const tbody = document.getElementById(`${page}TableBody`);
    if (tbody && skeletons[page]) {
        tbody.innerHTML = skeletons[page];
    }
}

// ═══════════════════════════════════════════════════════════════
// PREFETCH DATA FOR COMMON PAGES
// ═══════════════════════════════════════════════════════════════

async function prefetchData() {
    console.log('🚀 Prefetching common pages...');
    
    for (const page of state.prefetchQueue) {
        if (!state.dataLoaded[page]) {
            await callAPI(`get${page.charAt(0).toUpperCase() + page.slice(1)}`, 'POST', null, true);
        }
    }
    
    console.log('✅ Prefetch completed');
}

// ═══════════════════════════════════════════════════════════════
// API CALL WITH ENHANCED CACHING
// ═══════════════════════════════════════════════════════════════

async function callAPI(action, method = 'POST', data = null, useCache = false) {
    const cacheKey = action + (data ? JSON.stringify(data) : '');

    // Return cached data if available and fresh
    if (useCache && state.cache[cacheKey] && (Date.now() - state.cache[cacheKey].timestamp < state.cacheDuration)) {
        console.log('📦 Cache hit:', action);
        return state.cache[cacheKey].data;
    }

    // Only show global loading for non-cached calls
    const isBackgroundCall = state.prefetchQueue.some(p => action.toLowerCase().includes(p));
    if (!isBackgroundCall) {
        showLoading(true);
    }

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

        // Cache all GET requests
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
        if (!isBackgroundCall) {
            showNotification(errorMsg, 'error');
        }
        return { success: false };
    } finally {
        if (!isBackgroundCall) {
            showLoading(false);
        }
    }
}

function invalidateCache(pattern) {
    Object.keys(state.cache).forEach(key => {
        if (key.includes(pattern)) {
            delete state.cache[key];
            delete state.dataLoaded[pattern];
        }
    });
}

// ═══════════════════════════════════════════════════════════════
// DATA LOADERS (OPTIMIZED)
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
    
    state.dataLoaded.dashboard = true;
}

async function loadProductsData(useCache = true) {
    const res = await callAPI('getProducts', 'POST', null, useCache);
    if (!res.success) return;

    const tbody = document.getElementById('productsTableBody');
    if (!tbody) return;

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
    
    state.dataLoaded.products = true;
    
    // Render icons only for this table
    setTimeout(() => lucide.createIcons(), 0);
}

async function loadOrdersData(useCache = true) {
    const res = await callAPI('getOrders', 'POST', null, useCache);
    if (!res.success) return;
    
    const tbody = document.getElementById('ordersTableBody');
    if (!tbody) return;
    
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
    
    state.dataLoaded.orders = true;
    setTimeout(() => lucide.createIcons(), 0);
}

async function loadCustomersData(useCache = true) {
    const res = await callAPI('getCustomers', 'POST', null, useCache);
    if (!res.success) return;
    
    const tbody = document.getElementById('customersTableBody');
    if (!tbody) return;
    
    tbody.innerHTML = res.customers.map(c => `
        <tr>
            <td style="font-weight:700">${c.id}</td>
            <td>${c.name}</td>
            <td>${c.phone}</td>
            <td>${c.address}</td>
            <td><span class="badge badge-warning">${c.group}</span></td>
            <td style="font-weight:700">${formatCurrency(c.totalSpent)}</td>
            <td style="font-weight:700; color:${c.debt > 0 ? 'var(--danger)' : 'var(--success)'}">${formatCurrency(c.debt)}</td>
        </tr>
    `).join('');
    
    state.dataLoaded.customers = true;
}

async function loadSamplesData(useCache = true) {
    const res = await callAPI('getSamples', 'POST', null, useCache);
    if (!res.success) return;
    
    const tbody = document.getElementById('samplesTableBody');
    if (!tbody) return;
    
    tbody.innerHTML = res.samples.map(s => `
        <tr>
            <td>${new Date(s.date).toLocaleDateString('vi-VN')}</td>
            <td>${s.customer}</td>
            <td style="font-weight:700; color:var(--primary)">${s.sku}</td>
            <td>${s.productName}</td>
            <td style="font-weight:700">${s.quantity}</td>
            <td style="color:var(--text-muted)">${s.note || '-'}</td>
        </tr>
    `).join('');
    
    state.dataLoaded.samples = true;
}

async function loadCashFlowData(useCache = true) {
    const res = await callAPI('getCashFlow', 'POST', null, useCache);
    if (!res.success) return;
    
    const tbody = document.getElementById('cashflowTableBody');
    if (!tbody) return;
    
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
    state.dataLoaded.cashflow = true;
}

// ═══════════════════════════════════════════════════════════════
// HANDLERS
// ═══════════════════════════════════════════════════════════════

function initHandlers() {
    document.getElementById('refreshBtn').addEventListener('click', () => {
        invalidateCache(state.currentPage);
        loadPageDataOptimized(state.currentPage);
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
            invalidateCache('getProducts');
            invalidateCache('getDashboard');
            showNotification('Thêm sản phẩm thành công!', 'success');
            closeModal('productModal');
            loadProductsData(false);
        }
    });

    document.getElementById('addSampleBtn').addEventListener('click', async () => {
        const productSelect = document.getElementById('sampleSKU');
        const customerSelect = document.getElementById('sampleCustomer');

        productSelect.innerHTML = '<option>Đang tải...</option>';
        customerSelect.innerHTML = '<option>Đang tải...</option>';

        openModal('sampleModal');

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
function showLoading(show) { 
    const overlay = document.getElementById('loadingOverlay');
    if (overlay) overlay.style.display = show ? 'flex' : 'none'; 
}

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
