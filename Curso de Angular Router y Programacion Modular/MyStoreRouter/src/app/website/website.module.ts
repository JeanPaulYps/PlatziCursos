import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WebsiteRoutingModule } from './website-routing.module';
import { NavComponent } from './components/nav/nav.component';
import { LayoutComponent } from './components/layout/layout.component';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { MyCartComponent } from './pages/my-cart/my-cart.component';
import { ProductDetailComponent } from './pages/product-detail/product-detail.component';
import { RecoveryComponent } from './pages/recovery/recovery.component';
import { RegisterComponent } from './pages/register/register.component';
import { SwiperModule } from 'swiper/angular';
import { SharedModule } from '../shared/shared.module';
import { QuicklinkModule } from 'ngx-quicklink';
import { ProfileComponent } from './pages/profile/profile.component';

@NgModule({
  declarations: [
    NavComponent,
    HomeComponent,
    LoginComponent,
    RegisterComponent,
    RecoveryComponent,
    MyCartComponent,
    ProductDetailComponent,
    LayoutComponent,
    ProfileComponent,
  ],
  imports: [
    CommonModule, 
    WebsiteRoutingModule,
    SwiperModule, 
    SharedModule,
    QuicklinkModule
  ],
})
export class WebsiteModule {}
