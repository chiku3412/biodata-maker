import { CommonModule, isPlatformBrowser, ViewportScroller } from '@angular/common';
import { AfterViewInit, Component, HostListener, Inject, PLATFORM_ID, Renderer2 } from '@angular/core';
import { RouterModule } from '@angular/router';


@Component({
    selector: 'app-header',
    standalone: true,
    imports: [
        CommonModule, 
        RouterModule,
    ],
    templateUrl: './header.component.html'
})
export class HeaderComponent implements AfterViewInit {
    activeSection: string = 'home';
    constructor(
        @Inject(PLATFORM_ID) private platformId: Object,
        private viewportScroller: ViewportScroller,
        private renderer: Renderer2,
    ) {}

    @HostListener('window:scroll', [])
    onWindowScroll() {
        const header = document.getElementById('headerSection');
        const container = document.querySelector('.container');

        const scrolled = window.pageYOffset >= 200;

        header?.classList.toggle('bg-white', scrolled);
        header?.classList.toggle('bg-transparent', !scrolled);
        header?.classList.toggle('shadow-md', scrolled);

        container?.classList.toggle('shadow-none', scrolled);
        container?.classList.toggle('shadow-md', !scrolled);
    }

  

    scrollToSection(fragment: string): void {
        if (isPlatformBrowser(this.platformId)) {
            this.viewportScroller.scrollToAnchor(fragment);
            this.activeSection = fragment;
        }
    }

    private setupNavbarToggle(): void {
        const burgers: NodeListOf<Element> = document.querySelectorAll('.navbar-burger');
        const menus: NodeListOf<Element> = document.querySelectorAll('.navbar-menu');
        const closes: NodeListOf<Element> = document.querySelectorAll('.navbar-close');
        const backdrops: NodeListOf<Element> = document.querySelectorAll('.navbar-backdrop');

        if (burgers.length && menus.length) {
            burgers.forEach((burger) => {
                burger.addEventListener('click', () => {
                    menus.forEach((menu) => {
                        menu.classList.toggle('hidden');
                    });
                });
            });
        }

        if (closes.length) {
            closes.forEach((close) => {
                close.addEventListener('click', () => {
                    menus.forEach((menu) => {
                        menu.classList.toggle('hidden');
                    });
                });
            });
        }

        if (backdrops.length) {
            backdrops.forEach((backdrop) => {
                backdrop.addEventListener('click', () => {
                    menus.forEach((menu) => {
                        menu.classList.toggle('hidden');
                    });
                });
            });
        }
    }

    private observeSections(): void {
        const sections = document.querySelectorAll('section[id]');
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        this.activeSection = entry.target.id; // Update active section
                    }
                });
            },
            { threshold: 0.6 } // Trigger when 60% of the section is visible
        );

        sections.forEach((section) => observer.observe(section));
    }
    
    ngAfterViewInit(): void {
        if (isPlatformBrowser(this.platformId)) {
            this.setupNavbarToggle();
            this.observeSections();
        }
    }
}
