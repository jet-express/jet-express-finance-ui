import { Component, OnDestroy, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { navItems } from '../../_nav';
import { AuthService } from '../../services';
import { Router } from '@angular/router';
import { Branch, UserProfile } from '../../models';


@Component({
  selector: 'app-dashboard',
  templateUrl: './default-layout.component.html'
})
export class DefaultLayoutComponent implements OnDestroy {
  public navItems = navItems;
  public sidebarMinimized = true;
  private changes: MutationObserver;
  public element: HTMLElement;


  public accessBranches: Branch[] = [];
  public currentUser: UserProfile;
  public currentBranch: Branch;
  public currentAccessRoles: string[] = [];
  public accessibleNavItems : any = [];

  constructor(
    private authService: AuthService,
    private router: Router,
    @Inject(DOCUMENT) _document?: any) {

    this.changes = new MutationObserver((mutations) => {
      this.sidebarMinimized = _document.body.classList.contains('sidebar-minimized');
    });
    this.element = _document.body;
    this.changes.observe(<Element>this.element, {
      attributes: true,
      attributeFilter: ['class']
    });

    this.accessBranches = this.authService.getAccessibleBranches();
    this.currentUser = this.authService.getCurrentUserProfile();
    this.currentBranch = this.authService.getCurrentBranch();
    this.currentAccessRoles = this.authService.getCurrentAccessRoles();

    // intercept navItems
    let accessibleNavItems = [];

    this.navItems.forEach(item => {
      let childrenNav = [];
      if (!item.expectedRoles) {
        // this.validateExpextedRoles(item);
        if(item.children){
          for (var children of item.children) {
            var child = <any>children;
            if (child.expectedRoles) {
              if (this.validateAccessableRoles(child.expectedRoles))
                childrenNav.push(child);
            } else {
              childrenNav.push(child);
            }
          }
          item.children = childrenNav; 
        }
        accessibleNavItems.push(item);
      } else {
        if (this.validateAccessableRoles(item.expectedRoles)) {
          // this.validateExpextedRoles(item);
          if(item.children){
            for (var children of item.children) {
              var child = <any>children;
              if (child.expectedRoles) {
                if (this.validateAccessableRoles(child.expectedRoles))
                  childrenNav.push(child);
              } else {
                childrenNav.push(child);
              }
            }
            item.children = childrenNav;
          }
          accessibleNavItems.push(item); 
        }
      }
      // if(item.children){
      //   var temp = item.children.filter(x => !x.expectedRoles || this.validateRoles(x.expectedRoles));
      //   item.children = temp;      
      // }

      //accessibleNavItems.push(item); 
    });

    this.navItems = accessibleNavItems;
  }

  validateAccessableRoles(roles) {
    let currentRoles = this.currentAccessRoles;
    let exist = currentRoles.find((currentRoles) => roles.includes(currentRoles));
    if (exist)
      return true;
    else
      return false;
  }

  // validateExpextedRoles(item){
  //   let childrenNav = [];
  //   if(item.children){
  //     for (var children of item.children) {
  //       var child = <any>children;
  //       if (child.expectedRoles) {
  //         if (this.validateAccessableRoles(child.expectedRoles))
  //           childrenNav.push(child);
  //       } else {
  //         childrenNav.push(child);
  //       }
  //     }
  //     item.children = childrenNav;
  //   }
  //   this.accessibleNavItems.push(item); 
  // }

  ngOnDestroy(): void {
    this.changes.disconnect();
  }

  public logout() {
    this.authService.logout();

    this.router.navigate(['/login']);
  }

  public changeCurrentBranch(branch) {
    this.authService.setCurrentBranch(branch);

    window.location.reload();
  }
}
