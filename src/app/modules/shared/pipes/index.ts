import { NegativeToPositivePipe } from './negative-to-positive.pipe';
import { EmailNamePipe } from './email-name.pipe';
import { LocaleDatePipe } from './locale-date.pipe';
import { PhonePipe } from './phone.pipe';
export const SHARED_PIPES: any[] = [NegativeToPositivePipe, EmailNamePipe, LocaleDatePipe, PhonePipe];

export * from './negative-to-positive.pipe';
export * from './email-name.pipe';
export * from './locale-date.pipe';
export * from './phone.pipe';
