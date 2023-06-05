import { TestBed } from '@angular/core/testing';

import { HundelersInterceptor } from './hundelers.interceptor';

describe('HundelersInterceptor', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      HundelersInterceptor
      ]
  }));

  it('should be created', () => {
    const interceptor: HundelersInterceptor = TestBed.inject(HundelersInterceptor);
    expect(interceptor).toBeTruthy();
  });
});
