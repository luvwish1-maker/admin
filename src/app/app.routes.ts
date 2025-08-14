import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { LayoutComponent } from './shared/layout/layout.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ProductsComponent } from './components/products/products.component';
import { OrdersComponent } from './components/orders/orders.component';
import { PaymentsComponent } from './components/payments/payments.component';
import { NotificationsComponent } from './components/notifications/notifications.component';
import { CouponsComponent } from './components/coupons/coupons.component';
import { ProductDetailComponent } from './components/product-detail/product-detail.component';
import { OrderDetailComponent } from './components/order-detail/order-detail.component';
import { NotificationEditComponent } from './components/notification-edit/notification-edit.component';
import { CouponEditComponent } from './components/coupon-edit/coupon-edit.component';

export const routes: Routes = [
    { path: '', redirectTo: 'login', pathMatch: 'full' },
    { path: 'login', component: LoginComponent },
    {
        path: '',
        component: LayoutComponent,
        children: [
            { path: 'dashboard', component: DashboardComponent, data: { breadcrumb: 'Dashboard' } },

            { path: 'products', component: ProductsComponent, data: { breadcrumb: 'All Products' } },
            { path: 'product/:id', component: ProductDetailComponent, data: { breadcrumb: 'Product Details' } },

            { path: 'orders', component: OrdersComponent, data: { breadcrumb: 'Order List' } },
            { path: 'order/:id', component: OrderDetailComponent, data: { breadcrumb: 'Order Details' } },

            { path: 'revenue', component: PaymentsComponent, data: { breadcrumb: 'Revenue' } },

            { path: 'notifications', component: NotificationsComponent, data: { breadcrumb: 'Notifications' } },
            { path: 'notification/edit/:id', component: NotificationEditComponent, data: { breadcrumb: 'Edit Notification' } },
            { path: 'notification/create', component: NotificationEditComponent, data: { breadcrumb: 'Create Notification' } },

            { path: 'coupons', component: CouponsComponent, data: { breadcrumb: 'Coupons' } },
            { path: 'coupons/edit/:id', component: CouponEditComponent, data: { breadcrumb: 'Edit Coupon' } },
            { path: 'coupons/create', component: CouponEditComponent, data: { breadcrumb: 'Create Coupon' } }
        ]
    }
];
