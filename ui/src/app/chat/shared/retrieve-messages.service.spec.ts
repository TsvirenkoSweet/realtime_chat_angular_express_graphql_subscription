import { TestBed } from '@angular/core/testing';

import { RetrieveMessagesService } from './retrieve-messages.service';

describe('RetrieveMessagesService', () => {
  let service: RetrieveMessagesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RetrieveMessagesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
