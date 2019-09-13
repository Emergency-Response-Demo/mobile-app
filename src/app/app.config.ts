import { InjectionToken } from '@angular/core';
import { AeroGearConfiguration } from '@aerogear/core';
export const AG_CONFIG = new InjectionToken<AeroGearConfiguration>('ag.config');