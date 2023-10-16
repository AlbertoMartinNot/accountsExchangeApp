import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AccountsListViewComponent } from './accounts-list-view.component';

describe('AccountsListViewComponent', () => {
  let component: AccountsListViewComponent;
  let fixture: ComponentFixture<AccountsListViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AccountsListViewComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AccountsListViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
