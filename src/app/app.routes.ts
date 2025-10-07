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
import { ProductsEditComponent } from './components/products-edit/products-edit.component';
import { authGuard } from './core/guard/auth.guard';
import { UsersComponent } from './components/users/users.component';

export const routes: Routes = [
    { path: '', redirectTo: 'login', pathMatch: 'full' },
    { path: 'login', component: LoginComponent },

    {
        path: '',
        component: LayoutComponent,
        children: [
            { path: 'dashboard', component: DashboardComponent, data: { breadcrumb: 'Dashboard' }, canActivate: [authGuard] },

            {
                path: 'products',
                data: { breadcrumb: 'Products' },
                canActivate: [authGuard],
                children: [
                    { path: '', component: ProductsComponent },
                    { path: 'create', component: ProductsEditComponent, data: { breadcrumb: 'New' } },
                    { path: ':id', component: ProductDetailComponent, data: { breadcrumb: 'Details' } },
                    { path: 'edit/:id', component: ProductsEditComponent, data: { breadcrumb: 'Edit' } }
                ]
            },

            {
                path: 'orders',
                data: { breadcrumb: 'Orders' },
                canActivate: [authGuard],
                children: [
                    { path: '', component: OrdersComponent },
                    { path: ':id', component: OrderDetailComponent, data: { breadcrumb: 'Details' } }
                ]
            },

            { path: 'revenue', component: PaymentsComponent, data: { breadcrumb: 'Revenue' } },
            { path: 'users', component: UsersComponent, data: { breadcrumb: 'Users' } },

            {
                path: 'notifications',
                data: { breadcrumb: 'Notifications' },
                canActivate: [authGuard],
                children: [
                    { path: '', component: NotificationsComponent },
                    { path: 'create', component: NotificationEditComponent, data: { breadcrumb: 'Create' } },
                    { path: 'edit/:id', component: NotificationEditComponent, data: { breadcrumb: 'Edit' } }
                ]
            },

            {
                path: 'coupons',
                data: { breadcrumb: 'Coupons' },
                canActivate: [authGuard],
                children: [
                    { path: '', component: CouponsComponent },
                    { path: 'create', component: CouponEditComponent, data: { breadcrumb: 'Create' } },
                    { path: 'edit/:id', component: CouponEditComponent, data: { breadcrumb: 'Edit' } }
                ]
            }
        ]
    }
];
