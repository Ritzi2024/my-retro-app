import { MainComponent } from './layout/main/main.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { CategoryComponent } from './category/category.component';
const routes: Routes = [
  {
    path: "",
    component: MainComponent,
    children: [
      {
        path: "dashboard",
        component: DashboardComponent,
        data: { title: 'Dashboard' }
      },
      {
        path: "retro",
        loadChildren: () => import('./retro/retro.module').then(m => m.RetroModule),
        data: { title: 'Retro' }
      },
      {
        path: "todo",
        loadChildren: () => import('./todo/todo.module').then(m => m.TodoModule),
        data: { title: 'Todo' }
      },
      {
        path: 'categories',
        loadComponent: () => import('./category/category.component').then(mod => mod.CategoryComponent),
        data: { title: 'Category' }
      },

      { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
      { path: '**', redirectTo: "/dashboard" }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    preloadingStrategy: PreloadAllModules,
    enableTracing: true
  })],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
