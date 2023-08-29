// Created by Giseldah

// Floating point numbers bring errors into the calculation, both inside the Lotro-client and in this function collection. This is why a 100% match with the stats in Lotro is impossible.
// Anyway, to compensate for some errors, we use a calculation deviation correction value. This makes for instance 24.49999999 round to 25, as it's assumed that 24.5 was intended as outcome of a formula.
var DblCalcDev = 0.00000001;

function CalcStat(SName, SLvl, SParam)
{
	var SN = SName.trim().toUpperCase();
	var L = SLvl;
	var Lm = L-DblCalcDev;
	var Lp = L+DblCalcDev;
	var N = 1;
	var C = "";
	if (typeof SParam !== "undefined") {
		if (typeof SParam === "number")
			N = SParam;
		else if (typeof SParam === "string")
			C = SParam;
	}

	if (SN < "PARRYPRATP") {
		if (SN < "EVADEPRATPCAPR") {
			if (SN < "CHAMPIONCDCANBLOCK") {
				if (SN < "BPEPRATPCAP") {
					if (SN < "BLOCKPRATPB") {
						if (SN < "BEORNINGCDCANBLOCK") {
							if (SN < "ARMOURPENT") {
								if (SN == "-VERSION") {
									return "2.2p";
								} else {
									return 0;
								}
							} else if (SN > "ARMOURPENT") {
								if (SN > "ARMOURPENTADJ") {
									if (SN == "BEORNINGCDARMOURTYPE") {
										return 3;
									} else {
										return 0;
									}
								} else if (SN == "ARMOURPENTADJ") {
									if (Lm <= 49) {
										return 1;
									} else if (Lm <= 50) {
										return 0.8;
									} else {
										return 1;
									}
								} else {
									return 0;
								}
							} else {
								return StatLinInter("PntMPArmourPenT","TraitProg","ProgBArmour","ArmourPenTAdj",L,N,0);
							}
						} else if (SN > "BEORNINGCDCANBLOCK") {
							if (SN < "BLOCKPPRAT") {
								if (SN == "BLOCKPBONUS") {
									return CalcStat("BPEPBonus",L);
								} else {
									return 0;
								}
							} else if (SN > "BLOCKPPRAT") {
								if (SN > "BLOCKPRATP") {
									if (SN == "BLOCKPRATPA") {
										return CalcStat("BPEPRatPA",L);
									} else {
										return 0;
									}
								} else if (SN == "BLOCKPRATP") {
									return CalcStat("BPEPRatP",L,N);
								} else {
									return 0;
								}
							} else {
								return CalcStat("BPEPPRat",L,N);
							}
						} else {
							if (Lm <= 5) {
								return 0;
							} else {
								return 1;
							}
						}
					} else if (SN > "BLOCKPRATPB") {
						if (SN < "BPEPPRAT") {
							if (SN < "BLOCKPRATPCAP") {
								if (SN == "BLOCKPRATPC") {
									return CalcStat("BPEPRatPC",L);
								} else {
									return 0;
								}
							} else if (SN > "BLOCKPRATPCAP") {
								if (SN > "BLOCKPRATPCAPR") {
									if (SN == "BPEPBONUS") {
										return 0;
									} else {
										return 0;
									}
								} else if (SN == "BLOCKPRATPCAPR") {
									return CalcStat("BPEPRatPCapR",L);
								} else {
									return 0;
								}
							} else {
								return CalcStat("BPEPRatPCap",L);
							}
						} else if (SN > "BPEPPRAT") {
							if (SN < "BPEPRATPA") {
								if (SN == "BPEPRATP") {
									return CalcPercAB(CalcStat("BPEPRatPA",L),CalcStat("BPEPRatPB",L),CalcStat("BPEPRatPCap",L),N);
								} else {
									return 0;
								}
							} else if (SN > "BPEPRATPA") {
								if (SN > "BPEPRATPB") {
									if (SN == "BPEPRATPC") {
										return 0.5;
									} else {
										return 0;
									}
								} else if (SN == "BPEPRATPB") {
									return CalcStat("BRatRounded",L,"BRatLow");
								} else {
									return 0;
								}
							} else {
								return 39;
							}
						} else {
							return CalcRatAB(CalcStat("BPEPRatPA",L),CalcStat("BPEPRatPB",L),CalcStat("BPEPRatPCapR",L),N);
						}
					} else {
						return CalcStat("BPEPRatPB",L);
					}
				} else if (SN > "BPEPRATPCAP") {
					if (SN < "BRATPARTBPE") {
						if (SN < "BRATLOW") {
							if (SN < "BPET") {
								if (SN == "BPEPRATPCAPR") {
									return CalcStat("BPEPRatPB",L)*CalcStat("BPEPRatPC",L);
								} else {
									return 0;
								}
							} else if (SN > "BPET") {
								if (SN > "BRATCRITMAGN") {
									if (SN == "BRATHIGH") {
										if (Lm <= 50) {
											return LinFmod(1,400,4000,1,50,L);
										} else if (Lm <= 60) {
											return LinFmod(1,4000,6000,50,60,L);
										} else if (Lm <= 65) {
											return LinFmod(1,6000,8000,60,65,L);
										} else if (Lm <= 75) {
											return LinFmod(1,8000,12000,65,75,L);
										} else if (Lm <= 85) {
											return LinFmod(1,12000,18000,75,85,L);
										} else if (Lm <= 95) {
											return LinFmod(1,18000,26000,85,95,L);
										} else if (Lm <= 100) {
											return LinFmod(1,26000,36000,95,100,L);
										} else if (Lm <= 105) {
											return LinFmod(1,36000,48000,100,105,L);
										} else if (Lm <= 115) {
											return LinFmod(1,53000,72000,106,115,L);
										} else if (Lm <= 120) {
											return LinFmod(1,83000,90000,116,120,L);
										} else if (Lm <= 130) {
											return LinFmod(1,104000,135000,121,130,L);
										} else if (Lm <= 140) {
											return LinFmod(1,155000,270000,131,140,L);
										} else {
											return LinFmod(1,311000,540000,141,150,L);
										}
									} else {
										return 0;
									}
								} else if (SN == "BRATCRITMAGN") {
									if (Lm <= 50) {
										return LinFmod(1,700,7000,1,50,L);
									} else if (Lm <= 60) {
										return LinFmod(1,7000,10500,50,60,L);
									} else if (Lm <= 65) {
										return LinFmod(1,10500,14000,60,65,L);
									} else if (Lm <= 75) {
										return LinFmod(1,14000,21000,65,75,L);
									} else if (Lm <= 85) {
										return LinFmod(1,21000,31500,75,85,L);
									} else if (Lm <= 95) {
										return LinFmod(1,31500,46000,85,95,L);
									} else if (Lm <= 100) {
										return LinFmod(1,46000,64000,95,100,L);
									} else if (Lm <= 105) {
										return LinFmod(1,64000,85000,100,105,L);
									} else if (Lm <= 115) {
										return LinFmod(1,94000,128000,106,115,L);
									} else if (Lm <= 120) {
										return LinFmod(1,147000,160000,116,120,L);
									} else if (Lm <= 130) {
										return LinFmod(1,184000,240000,121,130,L);
									} else if (Lm <= 140) {
										return LinFmod(1,276000,480000,131,140,L);
									} else {
										return LinFmod(1,552000,960000,141,150,L);
									}
								} else {
									return 0;
								}
							} else {
								return StatLinInter("PntMPBPE","TraitProg","ProgBBPE","",L,N,0);
							}
						} else if (SN > "BRATLOW") {
							if (SN < "BRATMITHEAVY") {
								if (SN == "BRATMEDIUM") {
									if (Lm <= 50) {
										return LinFmod(1,300,3000,1,50,L);
									} else if (Lm <= 60) {
										return LinFmod(1,3000,4500,50,60,L);
									} else if (Lm <= 65) {
										return LinFmod(1,4500,6000,60,65,L);
									} else if (Lm <= 75) {
										return LinFmod(1,6000,9000,65,75,L);
									} else if (Lm <= 85) {
										return LinFmod(1,9000,13500,75,85,L);
									} else if (Lm <= 95) {
										return LinFmod(1,13500,19500,85,95,L);
									} else if (Lm <= 100) {
										return LinFmod(1,19500,27100,95,100,L);
									} else if (Lm <= 105) {
										return LinFmod(1,27100,36000,100,105,L);
									} else if (Lm <= 115) {
										return LinFmod(1,40000,54000,106,115,L);
									} else if (Lm <= 120) {
										return LinFmod(1,62000,68000,116,120,L);
									} else if (Lm <= 130) {
										return LinFmod(1,78000,102000,121,130,L);
									} else if (Lm <= 140) {
										return LinFmod(1,117000,204000,131,140,L);
									} else {
										return LinFmod(1,235000,410000,141,150,L);
									}
								} else {
									return 0;
								}
							} else if (SN > "BRATMITHEAVY") {
								if (SN > "BRATMITLIGHT") {
									if (SN == "BRATMITMEDIUM") {
										if (Lm <= 50) {
											return LinFmod(1,144,1670,1,50,L);
										} else if (Lm <= 60) {
											return LinFmod(1,1670,2500,50,60,L);
										} else if (Lm <= 65) {
											return LinFmod(1,2500,3300,60,65,L);
										} else if (Lm <= 75) {
											return LinFmod(1,3300,5000,65,75,L);
										} else if (Lm <= 85) {
											return LinFmod(1,5000,7500,75,85,L);
										} else if (Lm <= 95) {
											return LinFmod(1,7500,10800,85,95,L);
										} else if (Lm <= 100) {
											return LinFmod(1,10800,15100,95,100,L);
										} else if (Lm <= 105) {
											return LinFmod(1,15100,20100,100,105,L);
										} else if (Lm <= 115) {
											return LinFmod(1,22100,30000,106,115,L);
										} else if (Lm <= 120) {
											return LinFmod(1,34000,37000,116,120,L);
										} else if (Lm <= 130) {
											return LinFmod(1,43000,57000,121,130,L);
										} else if (Lm <= 140) {
											return LinFmod(1,65000,113000,131,140,L);
										} else {
											return LinFmod(1,130000,227000,141,150,L);
										}
									} else {
										return 0;
									}
								} else if (SN == "BRATMITLIGHT") {
									if (Lm <= 50) {
										return LinFmod(1,105,1330,1,50,L);
									} else if (Lm <= 60) {
										return LinFmod(1,1330,2000,50,60,L);
									} else if (Lm <= 65) {
										return LinFmod(1,2000,2660,60,65,L);
									} else if (Lm <= 75) {
										return LinFmod(1,2660,4000,65,75,L);
									} else if (Lm <= 85) {
										return LinFmod(1,4000,6000,75,85,L);
									} else if (Lm <= 95) {
										return LinFmod(1,6000,8700,85,95,L);
									} else if (Lm <= 100) {
										return LinFmod(1,8700,12100,95,100,L);
									} else if (Lm <= 105) {
										return LinFmod(1,12100,16100,100,105,L);
									} else if (Lm <= 115) {
										return LinFmod(1,17600,24000,106,115,L);
									} else if (Lm <= 120) {
										return LinFmod(1,27300,30000,116,120,L);
									} else if (Lm <= 130) {
										return LinFmod(1,35000,45000,121,130,L);
									} else if (Lm <= 140) {
										return LinFmod(1,52000,91000,131,140,L);
									} else {
										return LinFmod(1,104000,181000,141,150,L);
									}
								} else {
									return 0;
								}
							} else {
								return CalcStat("BRatLow",L);
							}
						} else {
							if (Lm <= 50) {
								return LinFmod(1,200,2000,1,50,L);
							} else if (Lm <= 60) {
								return LinFmod(1,2000,3000,50,60,L);
							} else if (Lm <= 65) {
								return LinFmod(1,3000,4000,60,65,L);
							} else if (Lm <= 75) {
								return LinFmod(1,4000,6000,65,75,L);
							} else if (Lm <= 85) {
								return LinFmod(1,6000,9000,75,85,L);
							} else if (Lm <= 95) {
								return LinFmod(1,9000,13000,85,95,L);
							} else if (Lm <= 100) {
								return LinFmod(1,13000,18100,95,100,L);
							} else if (Lm <= 105) {
								return LinFmod(1,18100,24100,100,105,L);
							} else if (Lm <= 115) {
								return LinFmod(1,26500,36000,106,115,L);
							} else if (Lm <= 120) {
								return LinFmod(1,41000,45000,116,120,L);
							} else if (Lm <= 130) {
								return LinFmod(1,52000,68000,121,130,L);
							} else if (Lm <= 140) {
								return LinFmod(1,78000,136000,131,140,L);
							} else {
								return LinFmod(1,156000,272000,141,150,L);
							}
						}
					} else if (SN > "BRATPARTBPE") {
						if (SN < "BURGLARCDARMOURTYPE") {
							if (SN < "BRATROUNDED") {
								if (SN == "BRATPROGB") {
									if (Lm <= 50) {
										return RoundDbl(CalcStat(C,L));
									} else {
										return CalcStat(C,L);
									}
								} else {
									return 0;
								}
							} else if (SN > "BRATROUNDED") {
								if (SN > "BRAWLERCDARMOURTYPE") {
									if (SN == "BRAWLERCDHASPOWER") {
										return 1;
									} else {
										return 0;
									}
								} else if (SN == "BRAWLERCDARMOURTYPE") {
									return 3;
								} else {
									return 0;
								}
							} else {
								if (Lm <= 50) {
									return RoundDbl(CalcStat(C,L));
								} else if (Lm <= 105) {
									return RoundDbl(CalcStat(C,L),-1);
								} else if (Lm <= 115) {
									return RoundDbl(CalcStat(C,L),-2);
								} else if (Lm <= 130) {
									return RoundDbl(CalcStat(C,L),-1);
								} else {
									return RoundDbl(CalcStat(C,L),-2);
								}
							}
						} else if (SN > "BURGLARCDARMOURTYPE") {
							if (SN < "CAPTAINCDCANBLOCK") {
								if (SN > "BURGLARCDHASPOWER") {
									if (SN == "CAPTAINCDARMOURTYPE") {
										return 3;
									} else {
										return 0;
									}
								} else if (SN == "BURGLARCDHASPOWER") {
									return 1;
								} else {
									return 0;
								}
							} else if (SN > "CAPTAINCDCANBLOCK") {
								if (SN > "CAPTAINCDHASPOWER") {
									if (SN == "CHAMPIONCDARMOURTYPE") {
										return 3;
									} else {
										return 0;
									}
								} else if (SN == "CAPTAINCDHASPOWER") {
									return 1;
								} else {
									return 0;
								}
							} else {
								if (Lm <= 14) {
									return 0;
								} else {
									return 1;
								}
							}
						} else {
							return 2;
						}
					} else {
						if (Lm <= 50) {
							return LinFmod(1,350,3500,1,50,L);
						} else if (Lm <= 60) {
							return LinFmod(1,3500,5300,50,60,L);
						} else if (Lm <= 65) {
							return LinFmod(1,5300,7100,60,65,L);
						} else if (Lm <= 75) {
							return LinFmod(1,7100,10700,65,75,L);
						} else if (Lm <= 85) {
							return LinFmod(1,10700,16100,75,85,L);
						} else if (Lm <= 95) {
							return LinFmod(1,16100,23300,85,95,L);
						} else if (Lm <= 100) {
							return LinFmod(1,23300,32000,95,100,L);
						} else if (Lm <= 105) {
							return LinFmod(1,32000,43000,100,105,L);
						} else if (Lm <= 115) {
							return LinFmod(1,47000,65000,106,115,L);
						} else if (Lm <= 120) {
							return LinFmod(1,75000,81000,116,120,L);
						} else if (Lm <= 130) {
							return LinFmod(1,93000,122000,121,130,L);
						} else if (Lm <= 140) {
							return LinFmod(1,140000,244000,131,140,L);
						} else {
							return LinFmod(1,281000,488000,141,150,L);
						}
					}
				} else {
					return 13;
				}
			} else if (SN > "CHAMPIONCDCANBLOCK") {
				if (SN < "CRITMAGNPRATP") {
					if (SN < "CRITHITPBONUS") {
						if (SN < "CRITDEFPRATPA") {
							if (SN < "CRITDEFPBONUS") {
								if (SN == "CHAMPIONCDHASPOWER") {
									return 1;
								} else {
									return 0;
								}
							} else if (SN > "CRITDEFPBONUS") {
								if (SN > "CRITDEFPPRAT") {
									if (SN == "CRITDEFPRATP") {
										return CalcPercAB(CalcStat("CritDefPRatPA",L),CalcStat("CritDefPRatPB",L),CalcStat("CritDefPRatPCap",L),N);
									} else {
										return 0;
									}
								} else if (SN == "CRITDEFPPRAT") {
									return CalcRatAB(CalcStat("CritDefPRatPA",L),CalcStat("CritDefPRatPB",L),CalcStat("CritDefPRatPCapR",L),N);
								} else {
									return 0;
								}
							} else {
								return 0;
							}
						} else if (SN > "CRITDEFPRATPA") {
							if (SN < "CRITDEFPRATPC") {
								if (SN == "CRITDEFPRATPB") {
									return CalcStat("BRatRounded",L,"BRatLow");
								} else {
									return 0;
								}
							} else if (SN > "CRITDEFPRATPC") {
								if (SN > "CRITDEFPRATPCAP") {
									if (SN == "CRITDEFPRATPCAPR") {
										return CalcStat("CritDefPRatPB",L)*CalcStat("CritDefPRatPC",L);
									} else {
										return 0;
									}
								} else if (SN == "CRITDEFPRATPCAP") {
									return 80;
								} else {
									return 0;
								}
							} else {
								return 0.5;
							}
						} else {
							return 240;
						}
					} else if (SN > "CRITHITPBONUS") {
						if (SN < "CRITHITPRATPC") {
							if (SN < "CRITHITPRATP") {
								if (SN == "CRITHITPPRAT") {
									return CalcRatAB(CalcStat("CritHitPRatPA",L),CalcStat("CritHitPRatPB",L),CalcStat("CritHitPRatPCapR",L),N);
								} else {
									return 0;
								}
							} else if (SN > "CRITHITPRATP") {
								if (SN > "CRITHITPRATPA") {
									if (SN == "CRITHITPRATPB") {
										return CalcStat("BRatRounded",L,"BRatLow");
									} else {
										return 0;
									}
								} else if (SN == "CRITHITPRATPA") {
									return 75;
								} else {
									return 0;
								}
							} else {
								return CalcPercAB(CalcStat("CritHitPRatPA",L),CalcStat("CritHitPRatPB",L),CalcStat("CritHitPRatPCap",L),N);
							}
						} else if (SN > "CRITHITPRATPC") {
							if (SN < "CRITHITPRATPCAPR") {
								if (SN == "CRITHITPRATPCAP") {
									return 25;
								} else {
									return 0;
								}
							} else if (SN > "CRITHITPRATPCAPR") {
								if (SN > "CRITMAGNPBONUS") {
									if (SN == "CRITMAGNPPRAT") {
										return CalcRatAB(CalcStat("CritMagnPRatPA",L),CalcStat("CritMagnPRatPB",L),CalcStat("CritMagnPRatPCapR",L),N);
									} else {
										return 0;
									}
								} else if (SN == "CRITMAGNPBONUS") {
									return 0;
								} else {
									return 0;
								}
							} else {
								return CalcStat("CritHitPRatPB",L)*CalcStat("CritHitPRatPC",L);
							}
						} else {
							return 0.5;
						}
					} else {
						return 0;
					}
				} else if (SN > "CRITMAGNPRATP") {
					if (SN < "DEVHITPRATPB") {
						if (SN < "CRITMAGNPRATPCAPR") {
							if (SN < "CRITMAGNPRATPB") {
								if (SN == "CRITMAGNPRATPA") {
									return 225;
								} else {
									return 0;
								}
							} else if (SN > "CRITMAGNPRATPB") {
								if (SN > "CRITMAGNPRATPC") {
									if (SN == "CRITMAGNPRATPCAP") {
										return 75;
									} else {
										return 0;
									}
								} else if (SN == "CRITMAGNPRATPC") {
									return 0.5;
								} else {
									return 0;
								}
							} else {
								return CalcStat("BRatRounded",L,"BRatCritMagn");
							}
						} else if (SN > "CRITMAGNPRATPCAPR") {
							if (SN < "DEVHITPPRAT") {
								if (SN == "DEVHITPBONUS") {
									return 0;
								} else {
									return 0;
								}
							} else if (SN > "DEVHITPPRAT") {
								if (SN > "DEVHITPRATP") {
									if (SN == "DEVHITPRATPA") {
										return 30;
									} else {
										return 0;
									}
								} else if (SN == "DEVHITPRATP") {
									return CalcPercAB(CalcStat("DevHitPRatPA",L),CalcStat("DevHitPRatPB",L),CalcStat("DevHitPRatPCap",L),N);
								} else {
									return 0;
								}
							} else {
								return CalcRatAB(CalcStat("DevHitPRatPA",L),CalcStat("DevHitPRatPB",L),CalcStat("DevHitPRatPCapR",L),N);
							}
						} else {
							return CalcStat("CritMagnPRatPB",L)*CalcStat("CritMagnPRatPC",L);
						}
					} else if (SN > "DEVHITPRATPB") {
						if (SN < "EVADEPPRAT") {
							if (SN < "DEVHITPRATPCAP") {
								if (SN == "DEVHITPRATPC") {
									return 0.5;
								} else {
									return 0;
								}
							} else if (SN > "DEVHITPRATPCAP") {
								if (SN > "DEVHITPRATPCAPR") {
									if (SN == "EVADEPBONUS") {
										return CalcStat("BPEPBonus",L);
									} else {
										return 0;
									}
								} else if (SN == "DEVHITPRATPCAPR") {
									return CalcStat("DevHitPRatPB",L)*CalcStat("DevHitPRatPC",L);
								} else {
									return 0;
								}
							} else {
								return 10;
							}
						} else if (SN > "EVADEPPRAT") {
							if (SN < "EVADEPRATPB") {
								if (SN > "EVADEPRATP") {
									if (SN == "EVADEPRATPA") {
										return CalcStat("BPEPRatPA",L);
									} else {
										return 0;
									}
								} else if (SN == "EVADEPRATP") {
									return CalcStat("BPEPRatP",L,N);
								} else {
									return 0;
								}
							} else if (SN > "EVADEPRATPB") {
								if (SN > "EVADEPRATPC") {
									if (SN == "EVADEPRATPCAP") {
										return CalcStat("BPEPRatPCap",L);
									} else {
										return 0;
									}
								} else if (SN == "EVADEPRATPC") {
									return CalcStat("BPEPRatPC",L);
								} else {
									return 0;
								}
							} else {
								return CalcStat("BPEPRatPB",L);
							}
						} else {
							return CalcStat("BPEPPRat",L,N);
						}
					} else {
						return CalcStat("BRatRounded",L,"BRatHigh");
					}
				} else {
					return CalcPercAB(CalcStat("CritMagnPRatPA",L),CalcStat("CritMagnPRatPB",L),CalcStat("CritMagnPRatPCap",L),N);
				}
			} else {
				if (Lm <= 9) {
					return 0;
				} else {
					return 1;
				}
			}
		} else if (SN > "EVADEPRATPCAPR") {
			if (SN < "MITHEAVYPPRAT") {
				if (SN < "INDMGPRATPCAP") {
					if (SN < "GUARDIANCDCANBLOCK") {
						if (SN < "FINESSEPRATPB") {
							if (SN < "FINESSEPPRAT") {
								if (SN == "FINESSEPBONUS") {
									return 0;
								} else {
									return 0;
								}
							} else if (SN > "FINESSEPPRAT") {
								if (SN > "FINESSEPRATP") {
									if (SN == "FINESSEPRATPA") {
										return 150;
									} else {
										return 0;
									}
								} else if (SN == "FINESSEPRATP") {
									return CalcPercAB(CalcStat("FinessePRatPA",L),CalcStat("FinessePRatPB",L),CalcStat("FinessePRatPCap",L),N);
								} else {
									return 0;
								}
							} else {
								return CalcRatAB(CalcStat("FinessePRatPA",L),CalcStat("FinessePRatPB",L),CalcStat("FinessePRatPCapR",L),N);
							}
						} else if (SN > "FINESSEPRATPB") {
							if (SN < "FINESSEPRATPCAP") {
								if (SN == "FINESSEPRATPC") {
									return 0.5;
								} else {
									return 0;
								}
							} else if (SN > "FINESSEPRATPCAP") {
								if (SN > "FINESSEPRATPCAPR") {
									if (SN == "GUARDIANCDARMOURTYPE") {
										return 3;
									} else {
										return 0;
									}
								} else if (SN == "FINESSEPRATPCAPR") {
									return CalcStat("FinessePRatPB",L)*CalcStat("FinessePRatPC",L);
								} else {
									return 0;
								}
							} else {
								return 50;
							}
						} else {
							return CalcStat("BRatRounded",L,"BRatLow");
						}
					} else if (SN > "GUARDIANCDCANBLOCK") {
						if (SN < "INDMGPPRAT") {
							if (SN < "HUNTERCDARMOURTYPE") {
								if (SN == "GUARDIANCDHASPOWER") {
									return 1;
								} else {
									return 0;
								}
							} else if (SN > "HUNTERCDARMOURTYPE") {
								if (SN > "HUNTERCDHASPOWER") {
									if (SN == "INDMGPBONUS") {
										return 0;
									} else {
										return 0;
									}
								} else if (SN == "HUNTERCDHASPOWER") {
									return 1;
								} else {
									return 0;
								}
							} else {
								return 2;
							}
						} else if (SN > "INDMGPPRAT") {
							if (SN < "INDMGPRATPA") {
								if (SN == "INDMGPRATP") {
									return CalcPercAB(CalcStat("InDmgPRatPA",L),CalcStat("InDmgPRatPB",L),CalcStat("InDmgPRatPCap",L),N);
								} else {
									return 0;
								}
							} else if (SN > "INDMGPRATPA") {
								if (SN > "INDMGPRATPB") {
									if (SN == "INDMGPRATPC") {
										return 0.5;
									} else {
										return 0;
									}
								} else if (SN == "INDMGPRATPB") {
									return CalcStat("BRatRounded",L,"BRatLow");
								} else {
									return 0;
								}
							} else {
								return 1200;
							}
						} else {
							return CalcRatAB(CalcStat("InDmgPRatPA",L),CalcStat("InDmgPRatPB",L),CalcStat("InDmgPRatPCapR",L),N);
						}
					} else {
						return 1;
					}
				} else if (SN > "INDMGPRATPCAP") {
					if (SN < "LEVELCAP") {
						if (SN < "INHEALPRATPA") {
							if (SN < "INHEALPBONUS") {
								if (SN == "INDMGPRATPCAPR") {
									return CalcStat("InDmgPRatPB",L)*CalcStat("InDmgPRatPC",L);
								} else {
									return 0;
								}
							} else if (SN > "INHEALPBONUS") {
								if (SN > "INHEALPPRAT") {
									if (SN == "INHEALPRATP") {
										return CalcPercAB(CalcStat("InHealPRatPA",L),CalcStat("InHealPRatPB",L),CalcStat("InHealPRatPCap",L),N);
									} else {
										return 0;
									}
								} else if (SN == "INHEALPPRAT") {
									return CalcRatAB(CalcStat("InHealPRatPA",L),CalcStat("InHealPRatPB",L),CalcStat("InHealPRatPCapR",L),N);
								} else {
									return 0;
								}
							} else {
								return 0;
							}
						} else if (SN > "INHEALPRATPA") {
							if (SN < "INHEALPRATPC") {
								if (SN == "INHEALPRATPB") {
									return CalcStat("BRatRounded",L,"BRatLow");
								} else {
									return 0;
								}
							} else if (SN > "INHEALPRATPC") {
								if (SN > "INHEALPRATPCAP") {
									if (SN == "INHEALPRATPCAPR") {
										return CalcStat("InHealPRatPB",L)*CalcStat("InHealPRatPC",L);
									} else {
										return 0;
									}
								} else if (SN == "INHEALPRATPCAP") {
									return 25;
								} else {
									return 0;
								}
							} else {
								return 0.5;
							}
						} else {
							return 75;
						}
					} else if (SN > "LEVELCAP") {
						if (SN < "MARINERCDARMOURTYPE") {
							if (SN < "LOREMASTERCDHASPOWER") {
								if (SN == "LOREMASTERCDARMOURTYPE") {
									return 1;
								} else {
									return 0;
								}
							} else if (SN > "LOREMASTERCDHASPOWER") {
								if (SN > "LVLEXPCOST") {
									if (SN == "LVLEXPCOSTTOT") {
										if (Lm <= 1) {
											return 0;
										} else {
											return CalcStat("LvlExpCostTot",L-1)+CalcStat("LvlExpCost",L);
										}
									} else {
										return 0;
									}
								} else if (SN == "LVLEXPCOST") {
									if (Lm <= 1) {
										return 0;
									} else if (Lm <= 5) {
										return RoundDbl(12.5*L*L+12.5666666666667*L+24.8666666666667);
									} else if (Lm <= 10) {
										return RoundDbl(33.8*L*L-179.48*L+452.6);
									} else if (Lm <= 15) {
										return RoundDbl(55.05*L*L-583.77*L+2370.5);
									} else if (Lm <= 20) {
										return RoundDbl(76.2*L*L-1196.96*L+6809);
									} else if (Lm <= 25) {
										return RoundDbl(97.4*L*L-2023*L+14849.8);
									} else if (Lm <= 30) {
										return RoundDbl(118.7*L*L-3066.02 *L+27612.8);
									} else if (Lm <= 35) {
										return RoundDbl(139.95*L*L-4319.23*L+46084.1);
									} else if (Lm <= 40) {
										return RoundDbl(161.2*L*L-5785.04*L+71356.2);
									} else if (Lm <= 45) {
										return RoundDbl(182.5*L*L-7467.38*L+104569.8);
									} else if (Lm <= 50) {
										return RoundDbl(203.8*L*L-9363.48*L+146761.8);
									} else if (Lm <= 55) {
										return RoundDbl(225.05*L*L-11467.77*L+198851.3);
									} else if (Lm <= 60) {
										return RoundDbl(246.3*L*L-13784.46*L+261988);
									} else if (Lm <= 70) {
										return RoundDbl(ExpFmod(CalcStat("LvlExpCost",60),61,5.071,L,undefined,3.485));
									} else if (Lm <= 75) {
										return RoundDbl(ExpFmod(CalcStat("LvlExpCost",70),71,5.072,L,undefined,-0.95));
									} else {
										return ExpFmod(CalcStat("LvlExpCost",75),76,5,L,0,-0.5);
									}
								} else {
									return 0;
								}
							} else {
								return 1;
							}
						} else if (SN > "MARINERCDARMOURTYPE") {
							if (SN < "MINSTRELCDCANBLOCK") {
								if (SN > "MARINERCDHASPOWER") {
									if (SN == "MINSTRELCDARMOURTYPE") {
										return 1;
									} else {
										return 0;
									}
								} else if (SN == "MARINERCDHASPOWER") {
									return 1;
								} else {
									return 0;
								}
							} else if (SN > "MINSTRELCDCANBLOCK") {
								if (SN > "MINSTRELCDHASPOWER") {
									if (SN == "MITHEAVYPBONUS") {
										return 0;
									} else {
										return 0;
									}
								} else if (SN == "MINSTRELCDHASPOWER") {
									return 1;
								} else {
									return 0;
								}
							} else {
								if (Lm <= 19) {
									return 0;
								} else {
									return 1;
								}
							}
						} else {
							return 2;
						}
					} else {
						return 140;
					}
				} else {
					return 400;
				}
			} else if (SN > "MITHEAVYPPRAT") {
				if (SN < "MITMEDIUMPRATPC") {
					if (SN < "MITLIGHTPRATPA") {
						if (SN < "MITHEAVYPRATPCAP") {
							if (SN < "MITHEAVYPRATPA") {
								if (SN == "MITHEAVYPRATP") {
									return CalcPercAB(CalcStat("MitHeavyPRatPA",L),CalcStat("MitHeavyPRatPB",L),CalcStat("MitHeavyPRatPCap",L),N);
								} else {
									return 0;
								}
							} else if (SN > "MITHEAVYPRATPA") {
								if (SN > "MITHEAVYPRATPB") {
									if (SN == "MITHEAVYPRATPC") {
										return 0.5;
									} else {
										return 0;
									}
								} else if (SN == "MITHEAVYPRATPB") {
									return CalcStat("BRatRounded",L,"BRatMitHeavy");
								} else {
									return 0;
								}
							} else {
								return 180;
							}
						} else if (SN > "MITHEAVYPRATPCAP") {
							if (SN < "MITLIGHTPBONUS") {
								if (SN == "MITHEAVYPRATPCAPR") {
									return CalcStat("MitHeavyPRatPB",L)*CalcStat("MitHeavyPRatPC",L);
								} else {
									return 0;
								}
							} else if (SN > "MITLIGHTPBONUS") {
								if (SN > "MITLIGHTPPRAT") {
									if (SN == "MITLIGHTPRATP") {
										return CalcPercAB(CalcStat("MitLightPRatPA",L),CalcStat("MitLightPRatPB",L),CalcStat("MitLightPRatPCap",L),N);
									} else {
										return 0;
									}
								} else if (SN == "MITLIGHTPPRAT") {
									return CalcRatAB(CalcStat("MitLightPRatPA",L),CalcStat("MitLightPRatPB",L),CalcStat("MitLightPRatPCapR",L),N);
								} else {
									return 0;
								}
							} else {
								return 0;
							}
						} else {
							return 60;
						}
					} else if (SN > "MITLIGHTPRATPA") {
						if (SN < "MITMEDIUMPBONUS") {
							if (SN < "MITLIGHTPRATPC") {
								if (SN == "MITLIGHTPRATPB") {
									return CalcStat("BRatRounded",L,"BRatMitLight");
								} else {
									return 0;
								}
							} else if (SN > "MITLIGHTPRATPC") {
								if (SN > "MITLIGHTPRATPCAP") {
									if (SN == "MITLIGHTPRATPCAPR") {
										return CalcStat("MitLightPRatPB",L)*CalcStat("MitLightPRatPC",L);
									} else {
										return 0;
									}
								} else if (SN == "MITLIGHTPRATPCAP") {
									return 40;
								} else {
									return 0;
								}
							} else {
								return 0.5;
							}
						} else if (SN > "MITMEDIUMPBONUS") {
							if (SN < "MITMEDIUMPRATP") {
								if (SN == "MITMEDIUMPPRAT") {
									return CalcRatAB(CalcStat("MitMediumPRatPA",L),CalcStat("MitMediumPRatPB",L),CalcStat("MitMediumPRatPCapR",L),N);
								} else {
									return 0;
								}
							} else if (SN > "MITMEDIUMPRATP") {
								if (SN > "MITMEDIUMPRATPA") {
									if (SN == "MITMEDIUMPRATPB") {
										return CalcStat("BRatRounded",L,"BRatMitMedium");
									} else {
										return 0;
									}
								} else if (SN == "MITMEDIUMPRATPA") {
									return 150;
								} else {
									return 0;
								}
							} else {
								return CalcPercAB(CalcStat("MitMediumPRatPA",L),CalcStat("MitMediumPRatPB",L),CalcStat("MitMediumPRatPCap",L),N);
							}
						} else {
							return 0;
						}
					} else {
						return 120;
					}
				} else if (SN > "MITMEDIUMPRATPC") {
					if (SN < "OUTDMGPRATPCAPR") {
						if (SN < "OUTDMGPRATP") {
							if (SN < "MITMEDIUMPRATPCAPR") {
								if (SN == "MITMEDIUMPRATPCAP") {
									return 50;
								} else {
									return 0;
								}
							} else if (SN > "MITMEDIUMPRATPCAPR") {
								if (SN > "OUTDMGPBONUS") {
									if (SN == "OUTDMGPPRAT") {
										return CalcRatAB(CalcStat("OutDmgPRatPA",L),CalcStat("OutDmgPRatPB",L),CalcStat("OutDmgPRatPCapR",L),N);
									} else {
										return 0;
									}
								} else if (SN == "OUTDMGPBONUS") {
									return 0;
								} else {
									return 0;
								}
							} else {
								return CalcStat("MitMediumPRatPB",L)*CalcStat("MitMediumPRatPC",L);
							}
						} else if (SN > "OUTDMGPRATP") {
							if (SN < "OUTDMGPRATPB") {
								if (SN == "OUTDMGPRATPA") {
									return 600;
								} else {
									return 0;
								}
							} else if (SN > "OUTDMGPRATPB") {
								if (SN > "OUTDMGPRATPC") {
									if (SN == "OUTDMGPRATPCAP") {
										return 200;
									} else {
										return 0;
									}
								} else if (SN == "OUTDMGPRATPC") {
									return 0.5;
								} else {
									return 0;
								}
							} else {
								return CalcStat("BRatRounded",L,"BRatMedium");
							}
						} else {
							return CalcPercAB(CalcStat("OutDmgPRatPA",L),CalcStat("OutDmgPRatPB",L),CalcStat("OutDmgPRatPCap",L),N);
						}
					} else if (SN > "OUTDMGPRATPCAPR") {
						if (SN < "OUTHEALPRATPB") {
							if (SN < "OUTHEALPPRAT") {
								if (SN == "OUTHEALPBONUS") {
									return 0;
								} else {
									return 0;
								}
							} else if (SN > "OUTHEALPPRAT") {
								if (SN > "OUTHEALPRATP") {
									if (SN == "OUTHEALPRATPA") {
										return 210;
									} else {
										return 0;
									}
								} else if (SN == "OUTHEALPRATP") {
									return CalcPercAB(CalcStat("OutHealPRatPA",L),CalcStat("OutHealPRatPB",L),CalcStat("OutHealPRatPCap",L),N);
								} else {
									return 0;
								}
							} else {
								return CalcRatAB(CalcStat("OutHealPRatPA",L),CalcStat("OutHealPRatPB",L),CalcStat("OutHealPRatPCapR",L),N);
							}
						} else if (SN > "OUTHEALPRATPB") {
							if (SN < "OUTHEALPRATPCAPR") {
								if (SN > "OUTHEALPRATPC") {
									if (SN == "OUTHEALPRATPCAP") {
										return 70;
									} else {
										return 0;
									}
								} else if (SN == "OUTHEALPRATPC") {
									return 0.5;
								} else {
									return 0;
								}
							} else if (SN > "OUTHEALPRATPCAPR") {
								if (SN > "PARRYPBONUS") {
									if (SN == "PARRYPPRAT") {
										return CalcStat("BPEPPRat",L,N);
									} else {
										return 0;
									}
								} else if (SN == "PARRYPBONUS") {
									return CalcStat("BPEPBonus",L);
								} else {
									return 0;
								}
							} else {
								return CalcStat("OutHealPRatPB",L)*CalcStat("OutHealPRatPC",L);
							}
						} else {
							return CalcStat("BRatRounded",L,"BRatHigh");
						}
					} else {
						return CalcStat("OutDmgPRatPB",L)*CalcStat("OutDmgPRatPC",L);
					}
				} else {
					return 0.5;
				}
			} else {
				return CalcRatAB(CalcStat("MitHeavyPRatPA",L),CalcStat("MitHeavyPRatPB",L),CalcStat("MitHeavyPRatPCapR",L),N);
			}
		} else {
			return CalcStat("BPEPRatPCapR",L);
		}
	} else if (SN > "PARRYPRATP") {
		if (SN < "PHYMITHPRATPB") {
			if (SN < "PARTEVADEPRATPA") {
				if (SN < "PARTBLOCKPRATPCAP") {
					if (SN < "PARTBLOCKMITPRATPB") {
						if (SN < "PARRYPRATPCAPR") {
							if (SN < "PARRYPRATPB") {
								if (SN == "PARRYPRATPA") {
									return CalcStat("BPEPRatPA",L);
								} else {
									return 0;
								}
							} else if (SN > "PARRYPRATPB") {
								if (SN > "PARRYPRATPC") {
									if (SN == "PARRYPRATPCAP") {
										return CalcStat("BPEPRatPCap",L);
									} else {
										return 0;
									}
								} else if (SN == "PARRYPRATPC") {
									return CalcStat("BPEPRatPC",L);
								} else {
									return 0;
								}
							} else {
								return CalcStat("BPEPRatPB",L);
							}
						} else if (SN > "PARRYPRATPCAPR") {
							if (SN < "PARTBLOCKMITPPRAT") {
								if (SN == "PARTBLOCKMITPBONUS") {
									return CalcStat("PartMitPBonus",L);
								} else {
									return 0;
								}
							} else if (SN > "PARTBLOCKMITPPRAT") {
								if (SN > "PARTBLOCKMITPRATP") {
									if (SN == "PARTBLOCKMITPRATPA") {
										return CalcStat("PartMitPRatPA",L);
									} else {
										return 0;
									}
								} else if (SN == "PARTBLOCKMITPRATP") {
									return CalcStat("PartMitPRatP",L,N);
								} else {
									return 0;
								}
							} else {
								return CalcStat("PartMitPPRat",L,N);
							}
						} else {
							return CalcStat("BPEPRatPCapR",L);
						}
					} else if (SN > "PARTBLOCKMITPRATPB") {
						if (SN < "PARTBLOCKPPRAT") {
							if (SN < "PARTBLOCKMITPRATPCAP") {
								if (SN == "PARTBLOCKMITPRATPC") {
									return CalcStat("PartMitPRatPC",L);
								} else {
									return 0;
								}
							} else if (SN > "PARTBLOCKMITPRATPCAP") {
								if (SN > "PARTBLOCKMITPRATPCAPR") {
									if (SN == "PARTBLOCKPBONUS") {
										return CalcStat("PartBPEPBonus",L);
									} else {
										return 0;
									}
								} else if (SN == "PARTBLOCKMITPRATPCAPR") {
									return CalcStat("PartMitPRatPCapR",L);
								} else {
									return 0;
								}
							} else {
								return CalcStat("PartMitPRatPCap",L);
							}
						} else if (SN > "PARTBLOCKPPRAT") {
							if (SN < "PARTBLOCKPRATPA") {
								if (SN == "PARTBLOCKPRATP") {
									return CalcStat("PartBPEPRatP",L,N);
								} else {
									return 0;
								}
							} else if (SN > "PARTBLOCKPRATPA") {
								if (SN > "PARTBLOCKPRATPB") {
									if (SN == "PARTBLOCKPRATPC") {
										return CalcStat("PartBPEPRatPC",L);
									} else {
										return 0;
									}
								} else if (SN == "PARTBLOCKPRATPB") {
									return CalcStat("PartBPEPRatPB",L);
								} else {
									return 0;
								}
							} else {
								return CalcStat("PartBPEPRatPA",L);
							}
						} else {
							return CalcStat("PartBPEPPRat",L,N);
						}
					} else {
						return CalcStat("PartMitPRatPB",L);
					}
				} else if (SN > "PARTBLOCKPRATPCAP") {
					if (SN < "PARTEVADEMITPBONUS") {
						if (SN < "PARTBPEPRATPA") {
							if (SN < "PARTBPEPBONUS") {
								if (SN == "PARTBLOCKPRATPCAPR") {
									return CalcStat("PartBPEPRatPCapR",L);
								} else {
									return 0;
								}
							} else if (SN > "PARTBPEPBONUS") {
								if (SN > "PARTBPEPPRAT") {
									if (SN == "PARTBPEPRATP") {
										return CalcPercAB(CalcStat("PartBPEPRatPA",L),CalcStat("PartBPEPRatPB",L),CalcStat("PartBPEPRatPCap",L),N);
									} else {
										return 0;
									}
								} else if (SN == "PARTBPEPPRAT") {
									return CalcRatAB(CalcStat("PartBPEPRatPA",L),CalcStat("PartBPEPRatPB",L),CalcStat("PartBPEPRatPCapR",L),N);
								} else {
									return 0;
								}
							} else {
								return 0;
							}
						} else if (SN > "PARTBPEPRATPA") {
							if (SN < "PARTBPEPRATPC") {
								if (SN == "PARTBPEPRATPB") {
									return CalcStat("BRatRounded",L,"BRatPartBPE");
								} else {
									return 0;
								}
							} else if (SN > "PARTBPEPRATPC") {
								if (SN > "PARTBPEPRATPCAP") {
									if (SN == "PARTBPEPRATPCAPR") {
										return CalcStat("PartBPEPRatPB",L)*CalcStat("PartBPEPRatPC",L);
									} else {
										return 0;
									}
								} else if (SN == "PARTBPEPRATPCAP") {
									return 25;
								} else {
									return 0;
								}
							} else {
								return 0.5;
							}
						} else {
							return 75;
						}
					} else if (SN > "PARTEVADEMITPBONUS") {
						if (SN < "PARTEVADEMITPRATPC") {
							if (SN < "PARTEVADEMITPRATP") {
								if (SN == "PARTEVADEMITPPRAT") {
									return CalcStat("PartMitPPRat",L,N);
								} else {
									return 0;
								}
							} else if (SN > "PARTEVADEMITPRATP") {
								if (SN > "PARTEVADEMITPRATPA") {
									if (SN == "PARTEVADEMITPRATPB") {
										return CalcStat("PartMitPRatPB",L);
									} else {
										return 0;
									}
								} else if (SN == "PARTEVADEMITPRATPA") {
									return CalcStat("PartMitPRatPA",L);
								} else {
									return 0;
								}
							} else {
								return CalcStat("PartMitPRatP",L,N);
							}
						} else if (SN > "PARTEVADEMITPRATPC") {
							if (SN < "PARTEVADEPBONUS") {
								if (SN > "PARTEVADEMITPRATPCAP") {
									if (SN == "PARTEVADEMITPRATPCAPR") {
										return CalcStat("PartMitPRatPCapR",L);
									} else {
										return 0;
									}
								} else if (SN == "PARTEVADEMITPRATPCAP") {
									return CalcStat("PartMitPRatPCap",L);
								} else {
									return 0;
								}
							} else if (SN > "PARTEVADEPBONUS") {
								if (SN > "PARTEVADEPPRAT") {
									if (SN == "PARTEVADEPRATP") {
										return CalcStat("PartBPEPRatP",L,N);
									} else {
										return 0;
									}
								} else if (SN == "PARTEVADEPPRAT") {
									return CalcStat("PartBPEPPRat",L,N);
								} else {
									return 0;
								}
							} else {
								return CalcStat("PartBPEPBonus",L);
							}
						} else {
							return CalcStat("PartMitPRatPC",L);
						}
					} else {
						return CalcStat("PartMitPBonus",L);
					}
				} else {
					return CalcStat("PartBPEPRatPCap",L);
				}
			} else if (SN > "PARTEVADEPRATPA") {
				if (SN < "PARTPARRYMITPRATPCAPR") {
					if (SN < "PARTMITPRATPC") {
						if (SN < "PARTMITPBONUS") {
							if (SN < "PARTEVADEPRATPC") {
								if (SN == "PARTEVADEPRATPB") {
									return CalcStat("PartBPEPRatPB",L);
								} else {
									return 0;
								}
							} else if (SN > "PARTEVADEPRATPC") {
								if (SN > "PARTEVADEPRATPCAP") {
									if (SN == "PARTEVADEPRATPCAPR") {
										return CalcStat("PartBPEPRatPCapR",L);
									} else {
										return 0;
									}
								} else if (SN == "PARTEVADEPRATPCAP") {
									return CalcStat("PartBPEPRatPCap",L);
								} else {
									return 0;
								}
							} else {
								return CalcStat("PartBPEPRatPC",L);
							}
						} else if (SN > "PARTMITPBONUS") {
							if (SN < "PARTMITPRATP") {
								if (SN == "PARTMITPPRAT") {
									return CalcRatAB(CalcStat("PartMitPRatPA",L),CalcStat("PartMitPRatPB",L),CalcStat("PartMitPRatPCapR",L),N);
								} else {
									return 0;
								}
							} else if (SN > "PARTMITPRATP") {
								if (SN > "PARTMITPRATPA") {
									if (SN == "PARTMITPRATPB") {
										return CalcStat("BRatRounded",L,"BRatPartBPE");
									} else {
										return 0;
									}
								} else if (SN == "PARTMITPRATPA") {
									return 105;
								} else {
									return 0;
								}
							} else {
								return CalcPercAB(CalcStat("PartMitPRatPA",L),CalcStat("PartMitPRatPB",L),CalcStat("PartMitPRatPCap",L),N);
							}
						} else {
							return 0.1;
						}
					} else if (SN > "PARTMITPRATPC") {
						if (SN < "PARTPARRYMITPRATP") {
							if (SN < "PARTMITPRATPCAPR") {
								if (SN == "PARTMITPRATPCAP") {
									return 35;
								} else {
									return 0;
								}
							} else if (SN > "PARTMITPRATPCAPR") {
								if (SN > "PARTPARRYMITPBONUS") {
									if (SN == "PARTPARRYMITPPRAT") {
										return CalcStat("PartMitPPRat",L,N);
									} else {
										return 0;
									}
								} else if (SN == "PARTPARRYMITPBONUS") {
									return CalcStat("PartMitPBonus",L);
								} else {
									return 0;
								}
							} else {
								return CalcStat("PartMitPRatPB",L)*CalcStat("PartMitPRatPC",L);
							}
						} else if (SN > "PARTPARRYMITPRATP") {
							if (SN < "PARTPARRYMITPRATPB") {
								if (SN == "PARTPARRYMITPRATPA") {
									return CalcStat("PartMitPRatPA",L);
								} else {
									return 0;
								}
							} else if (SN > "PARTPARRYMITPRATPB") {
								if (SN > "PARTPARRYMITPRATPC") {
									if (SN == "PARTPARRYMITPRATPCAP") {
										return CalcStat("PartMitPRatPCap",L);
									} else {
										return 0;
									}
								} else if (SN == "PARTPARRYMITPRATPC") {
									return CalcStat("PartMitPRatPC",L);
								} else {
									return 0;
								}
							} else {
								return CalcStat("PartMitPRatPB",L);
							}
						} else {
							return CalcStat("PartMitPRatP",L,N);
						}
					} else {
						return 0.5;
					}
				} else if (SN > "PARTPARRYMITPRATPCAPR") {
					if (SN < "PHYDMGPPRAT") {
						if (SN < "PARTPARRYPRATPB") {
							if (SN < "PARTPARRYPPRAT") {
								if (SN == "PARTPARRYPBONUS") {
									return CalcStat("PartBPEPBonus",L);
								} else {
									return 0;
								}
							} else if (SN > "PARTPARRYPPRAT") {
								if (SN > "PARTPARRYPRATP") {
									if (SN == "PARTPARRYPRATPA") {
										return CalcStat("PartBPEPRatPA",L);
									} else {
										return 0;
									}
								} else if (SN == "PARTPARRYPRATP") {
									return CalcStat("PartBPEPRatP",L,N);
								} else {
									return 0;
								}
							} else {
								return CalcStat("PartBPEPPRat",L,N);
							}
						} else if (SN > "PARTPARRYPRATPB") {
							if (SN < "PARTPARRYPRATPCAP") {
								if (SN == "PARTPARRYPRATPC") {
									return CalcStat("PartBPEPRatPC",L);
								} else {
									return 0;
								}
							} else if (SN > "PARTPARRYPRATPCAP") {
								if (SN > "PARTPARRYPRATPCAPR") {
									if (SN == "PHYDMGPBONUS") {
										return CalcStat("OutDmgPBonus",L);
									} else {
										return 0;
									}
								} else if (SN == "PARTPARRYPRATPCAPR") {
									return CalcStat("PartBPEPRatPCapR",L);
								} else {
									return 0;
								}
							} else {
								return CalcStat("PartBPEPRatPCap",L);
							}
						} else {
							return CalcStat("PartBPEPRatPB",L);
						}
					} else if (SN > "PHYDMGPPRAT") {
						if (SN < "PHYDMGPRATPCAP") {
							if (SN < "PHYDMGPRATPA") {
								if (SN == "PHYDMGPRATP") {
									return CalcStat("OutDmgPRatP",L,N);
								} else {
									return 0;
								}
							} else if (SN > "PHYDMGPRATPA") {
								if (SN > "PHYDMGPRATPB") {
									if (SN == "PHYDMGPRATPC") {
										return CalcStat("OutDmgPRatPC",L);
									} else {
										return 0;
									}
								} else if (SN == "PHYDMGPRATPB") {
									return CalcStat("OutDmgPRatPB",L);
								} else {
									return 0;
								}
							} else {
								return CalcStat("OutDmgPRatPA",L);
							}
						} else if (SN > "PHYDMGPRATPCAP") {
							if (SN < "PHYMITHPPRAT") {
								if (SN > "PHYDMGPRATPCAPR") {
									if (SN == "PHYMITHPBONUS") {
										return CalcStat("MitHeavyPBonus",L);
									} else {
										return 0;
									}
								} else if (SN == "PHYDMGPRATPCAPR") {
									return CalcStat("OutDmgPRatPCapR",L);
								} else {
									return 0;
								}
							} else if (SN > "PHYMITHPPRAT") {
								if (SN > "PHYMITHPRATP") {
									if (SN == "PHYMITHPRATPA") {
										return CalcStat("MitHeavyPRatPA",L);
									} else {
										return 0;
									}
								} else if (SN == "PHYMITHPRATP") {
									return CalcStat("MitHeavyPRatP",L,N);
								} else {
									return 0;
								}
							} else {
								return CalcStat("MitHeavyPPRat",L,N);
							}
						} else {
							return CalcStat("OutDmgPRatPCap",L);
						}
					} else {
						return CalcStat("OutDmgPPRat",L,N);
					}
				} else {
					return CalcStat("PartMitPRatPCapR",L);
				}
			} else {
				return CalcStat("PartBPEPRatPA",L);
			}
		} else if (SN > "PHYMITHPRATPB") {
			if (SN < "T2PENMIT") {
				if (SN < "PNTMPARMOURPENT") {
					if (SN < "PHYMITLPRATPCAP") {
						if (SN < "PHYMITLPPRAT") {
							if (SN < "PHYMITHPRATPCAP") {
								if (SN == "PHYMITHPRATPC") {
									return CalcStat("MitHeavyPRatPC",L);
								} else {
									return 0;
								}
							} else if (SN > "PHYMITHPRATPCAP") {
								if (SN > "PHYMITHPRATPCAPR") {
									if (SN == "PHYMITLPBONUS") {
										return CalcStat("MitLightPBonus",L);
									} else {
										return 0;
									}
								} else if (SN == "PHYMITHPRATPCAPR") {
									return CalcStat("MitHeavyPRatPCapR",L);
								} else {
									return 0;
								}
							} else {
								return CalcStat("MitHeavyPRatPCap",L);
							}
						} else if (SN > "PHYMITLPPRAT") {
							if (SN < "PHYMITLPRATPA") {
								if (SN == "PHYMITLPRATP") {
									return CalcStat("MitLightPRatP",L,N);
								} else {
									return 0;
								}
							} else if (SN > "PHYMITLPRATPA") {
								if (SN > "PHYMITLPRATPB") {
									if (SN == "PHYMITLPRATPC") {
										return CalcStat("MitLightPRatPC",L);
									} else {
										return 0;
									}
								} else if (SN == "PHYMITLPRATPB") {
									return CalcStat("MitLightPRatPB",L);
								} else {
									return 0;
								}
							} else {
								return CalcStat("MitLightPRatPA",L);
							}
						} else {
							return CalcStat("MitLightPPRat",L,N);
						}
					} else if (SN > "PHYMITLPRATPCAP") {
						if (SN < "PHYMITMPRATPA") {
							if (SN < "PHYMITMPBONUS") {
								if (SN == "PHYMITLPRATPCAPR") {
									return CalcStat("MitLightPRatPCapR",L);
								} else {
									return 0;
								}
							} else if (SN > "PHYMITMPBONUS") {
								if (SN > "PHYMITMPPRAT") {
									if (SN == "PHYMITMPRATP") {
										return CalcStat("MitMediumPRatP",L,N);
									} else {
										return 0;
									}
								} else if (SN == "PHYMITMPPRAT") {
									return CalcStat("MitMediumPPRat",L,N);
								} else {
									return 0;
								}
							} else {
								return CalcStat("MitMediumPBonus",L);
							}
						} else if (SN > "PHYMITMPRATPA") {
							if (SN < "PHYMITMPRATPC") {
								if (SN == "PHYMITMPRATPB") {
									return CalcStat("MitMediumPRatPB",L);
								} else {
									return 0;
								}
							} else if (SN > "PHYMITMPRATPC") {
								if (SN > "PHYMITMPRATPCAP") {
									if (SN == "PHYMITMPRATPCAPR") {
										return CalcStat("MitMediumPRatPCapR",L);
									} else {
										return 0;
									}
								} else if (SN == "PHYMITMPRATPCAP") {
									return CalcStat("MitMediumPRatPCap",L);
								} else {
									return 0;
								}
							} else {
								return CalcStat("MitMediumPRatPC",L);
							}
						} else {
							return CalcStat("MitMediumPRatPA",L);
						}
					} else {
						return CalcStat("MitLightPRatPCap",L);
					}
				} else if (SN > "PNTMPARMOURPENT") {
					if (SN < "RESISTPRATP") {
						if (SN < "PROGBRESIST") {
							if (SN < "PNTMPRESIST") {
								if (SN == "PNTMPBPE") {
									return 42/1200;
								} else {
									return 0;
								}
							} else if (SN > "PNTMPRESIST") {
								if (SN > "PROGBARMOUR") {
									if (SN == "PROGBBPE") {
										return CalcStat("BRatProgB",L,"BRatLow");
									} else {
										return 0;
									}
								} else if (SN == "PROGBARMOUR") {
									return CalcStat("BRatProgB",L,"BRatMitMedium");
								} else {
									return 0;
								}
							} else {
								return 36/1200;
							}
						} else if (SN > "PROGBRESIST") {
							if (SN < "PROGEXTCOMLOWRAW") {
								if (SN == "PROGEXTCOMHIGHRAW") {
									if (Lm <= 121) {
										return ExpFmod(N,121,20,L);
									} else if (Lm <= 125) {
										return ExpFmod(CalcStat("ProgExtComHighRaw",121,N),122,5.5,L);
									} else if (Lm <= 126) {
										return ExpFmod(CalcStat("ProgExtComHighRaw",125,N),126,20,L);
									} else if (Lm <= 130) {
										return ExpFmod(CalcStat("ProgExtComHighRaw",126,N),127,5.5,L);
									} else if (Lm <= 131) {
										return ExpFmod(CalcStat("ProgExtComHighRaw",130,N),131,20,L);
									} else if (Lm <= 140) {
										return ExpFmod(CalcStat("ProgExtComHighRaw",131,N),132,5.5,L);
									} else {
										return CalcStat("ProgExtComHighRaw",140,N);
									}
								} else {
									return 0;
								}
							} else if (SN > "PROGEXTCOMLOWRAW") {
								if (SN > "RESISTPBONUS") {
									if (SN == "RESISTPPRAT") {
										return CalcRatAB(CalcStat("ResistPRatPA",L),CalcStat("ResistPRatPB",L),CalcStat("ResistPRatPCapR",L),N);
									} else {
										return 0;
									}
								} else if (SN == "RESISTPBONUS") {
									return 0;
								} else {
									return 0;
								}
							} else {
								if (Lm <= 116) {
									return ExpFmod(N,116,20,L);
								} else if (Lm <= 120) {
									return ExpFmod(CalcStat("ProgExtComLowRaw",116,N),117,5.5,L);
								} else {
									return CalcStat("ProgExtComHighRaw",L,CalcStat("ProgExtComLowRaw",120,N));
								}
							}
						} else {
							return CalcStat("BRatProgB",L,"BRatMedium");
						}
					} else if (SN > "RESISTPRATP") {
						if (SN < "RESISTPRATPCAPR") {
							if (SN < "RESISTPRATPB") {
								if (SN == "RESISTPRATPA") {
									return 150;
								} else {
									return 0;
								}
							} else if (SN > "RESISTPRATPB") {
								if (SN > "RESISTPRATPC") {
									if (SN == "RESISTPRATPCAP") {
										return 50;
									} else {
										return 0;
									}
								} else if (SN == "RESISTPRATPC") {
									return 0.5;
								} else {
									return 0;
								}
							} else {
								return CalcStat("BRatRounded",L,"BRatMedium");
							}
						} else if (SN > "RESISTPRATPCAPR") {
							if (SN < "RUNEKEEPERCDHASPOWER") {
								if (SN > "RESISTT") {
									if (SN == "RUNEKEEPERCDARMOURTYPE") {
										return 1;
									} else {
										return 0;
									}
								} else if (SN == "RESISTT") {
									return StatLinInter("PntMPResist","TraitProg","ProgBResist","",L,N,0);
								} else {
									return 0;
								}
							} else if (SN > "RUNEKEEPERCDHASPOWER") {
								if (SN > "T2PENARMOUR") {
									if (SN == "T2PENBPE") {
										if (Lm <= 115) {
											return (-40)*L;
										} else {
											return CalcStat("ProgExtComLowRaw",L,CalcStat("T2PenBPE",115));
										}
									} else {
										return 0;
									}
								} else if (SN == "T2PENARMOUR") {
									return CalcStat("T2penMit",L);
								} else {
									return 0;
								}
							} else {
								return 1;
							}
						} else {
							return CalcStat("ResistPRatPB",L)*CalcStat("ResistPRatPC",L);
						}
					} else {
						return CalcPercAB(CalcStat("ResistPRatPA",L),CalcStat("ResistPRatPB",L),CalcStat("ResistPRatPCap",L),N);
					}
				} else {
					return 72/1200;
				}
			} else if (SN > "T2PENMIT") {
				if (SN < "TACMITLPRATPA") {
					if (SN < "TACMITHPBONUS") {
						if (SN < "TACDMGPRATPA") {
							if (SN < "TACDMGPBONUS") {
								if (SN == "T2PENRESIST") {
									if (Lm <= 115) {
										return (-90)*L;
									} else {
										return CalcStat("ProgExtComLowRaw",L,CalcStat("T2PenResist",115));
									}
								} else {
									return 0;
								}
							} else if (SN > "TACDMGPBONUS") {
								if (SN > "TACDMGPPRAT") {
									if (SN == "TACDMGPRATP") {
										return CalcStat("OutDmgPRatP",L,N);
									} else {
										return 0;
									}
								} else if (SN == "TACDMGPPRAT") {
									return CalcStat("OutDmgPPRat",L,N);
								} else {
									return 0;
								}
							} else {
								return CalcStat("OutDmgPBonus",L);
							}
						} else if (SN > "TACDMGPRATPA") {
							if (SN < "TACDMGPRATPC") {
								if (SN == "TACDMGPRATPB") {
									return CalcStat("OutDmgPRatPB",L);
								} else {
									return 0;
								}
							} else if (SN > "TACDMGPRATPC") {
								if (SN > "TACDMGPRATPCAP") {
									if (SN == "TACDMGPRATPCAPR") {
										return CalcStat("OutDmgPRatPCapR",L);
									} else {
										return 0;
									}
								} else if (SN == "TACDMGPRATPCAP") {
									return CalcStat("OutDmgPRatPCap",L);
								} else {
									return 0;
								}
							} else {
								return CalcStat("OutDmgPRatPC",L);
							}
						} else {
							return CalcStat("OutDmgPRatPA",L);
						}
					} else if (SN > "TACMITHPBONUS") {
						if (SN < "TACMITHPRATPC") {
							if (SN < "TACMITHPRATP") {
								if (SN == "TACMITHPPRAT") {
									return CalcStat("MitHeavyPPRat",L,N);
								} else {
									return 0;
								}
							} else if (SN > "TACMITHPRATP") {
								if (SN > "TACMITHPRATPA") {
									if (SN == "TACMITHPRATPB") {
										return CalcStat("MitHeavyPRatPB",L);
									} else {
										return 0;
									}
								} else if (SN == "TACMITHPRATPA") {
									return CalcStat("MitHeavyPRatPA",L);
								} else {
									return 0;
								}
							} else {
								return CalcStat("MitHeavyPRatP",L,N);
							}
						} else if (SN > "TACMITHPRATPC") {
							if (SN < "TACMITLPBONUS") {
								if (SN > "TACMITHPRATPCAP") {
									if (SN == "TACMITHPRATPCAPR") {
										return CalcStat("MitHeavyPRatPCapR",L);
									} else {
										return 0;
									}
								} else if (SN == "TACMITHPRATPCAP") {
									return CalcStat("MitHeavyPRatPCap",L);
								} else {
									return 0;
								}
							} else if (SN > "TACMITLPBONUS") {
								if (SN > "TACMITLPPRAT") {
									if (SN == "TACMITLPRATP") {
										return CalcStat("MitLightPRatP",L,N);
									} else {
										return 0;
									}
								} else if (SN == "TACMITLPPRAT") {
									return CalcStat("MitLightPPRat",L,N);
								} else {
									return 0;
								}
							} else {
								return CalcStat("MitLightPBonus",L);
							}
						} else {
							return CalcStat("MitHeavyPRatPC",L);
						}
					} else {
						return CalcStat("MitHeavyPBonus",L);
					}
				} else if (SN > "TACMITLPRATPA") {
					if (SN < "TACMITMPRATPC") {
						if (SN < "TACMITMPBONUS") {
							if (SN < "TACMITLPRATPC") {
								if (SN == "TACMITLPRATPB") {
									return CalcStat("MitLightPRatPB",L);
								} else {
									return 0;
								}
							} else if (SN > "TACMITLPRATPC") {
								if (SN > "TACMITLPRATPCAP") {
									if (SN == "TACMITLPRATPCAPR") {
										return CalcStat("MitLightPRatPCapR",L);
									} else {
										return 0;
									}
								} else if (SN == "TACMITLPRATPCAP") {
									return CalcStat("MitLightPRatPCap",L);
								} else {
									return 0;
								}
							} else {
								return CalcStat("MitLightPRatPC",L);
							}
						} else if (SN > "TACMITMPBONUS") {
							if (SN < "TACMITMPRATP") {
								if (SN == "TACMITMPPRAT") {
									return CalcStat("MitMediumPPRat",L,N);
								} else {
									return 0;
								}
							} else if (SN > "TACMITMPRATP") {
								if (SN > "TACMITMPRATPA") {
									if (SN == "TACMITMPRATPB") {
										return CalcStat("MitMediumPRatPB",L);
									} else {
										return 0;
									}
								} else if (SN == "TACMITMPRATPA") {
									return CalcStat("MitMediumPRatPA",L);
								} else {
									return 0;
								}
							} else {
								return CalcStat("MitMediumPRatP",L,N);
							}
						} else {
							return CalcStat("MitMediumPBonus",L);
						}
					} else if (SN > "TACMITMPRATPC") {
						if (SN < "TPENCHOICE") {
							if (SN < "TACMITMPRATPCAPR") {
								if (SN == "TACMITMPRATPCAP") {
									return CalcStat("MitMediumPRatPCap",L);
								} else {
									return 0;
								}
							} else if (SN > "TACMITMPRATPCAPR") {
								if (SN > "TPENARMOUR") {
									if (SN == "TPENBPE") {
										return -CalcStat("BPET",L,CalcStat("TpenChoice",N));
									} else {
										return 0;
									}
								} else if (SN == "TPENARMOUR") {
									return -CalcStat("ArmourPenT",L,CalcStat("TpenChoice",N));
								} else {
									return 0;
								}
							} else {
								return CalcStat("MitMediumPRatPCapR",L);
							}
						} else if (SN > "TPENCHOICE") {
							if (SN < "WARDENCDARMOURTYPE") {
								if (SN > "TPENRESIST") {
									if (SN == "TRAITPROG") {
										return [[1,25,50,60,65,75,85,95,100,105,115,120,130,131,140,141],[1,25,50,60,65,75,85,95,100,105,115,120,130,131,140,141]];
									} else {
										return 0;
									}
								} else if (SN == "TPENRESIST") {
									return -CalcStat("ResistT",L,CalcStat("TpenChoice",N)*2);
								} else {
									return 0;
								}
							} else if (SN > "WARDENCDARMOURTYPE") {
								if (SN > "WARDENCDCANBLOCK") {
									if (SN == "WARDENCDHASPOWER") {
										return 1;
									} else {
										return 0;
									}
								} else if (SN == "WARDENCDCANBLOCK") {
									return 1;
								} else {
									return 0;
								}
							} else {
								return 2;
							}
						} else {
							return DataTableValue([0,1,2],L);
						}
					} else {
						return CalcStat("MitMediumPRatPC",L);
					}
				} else {
					return CalcStat("MitLightPRatPA",L);
				}
			} else {
				if (Lm <= 115) {
					return RoundDblDown(L*13.5)*-5;
				} else {
					return CalcStat("ProgExtComLowRaw",L,CalcStat("T2PenMit",115));
				}
			}
		} else {
			return CalcStat("MitHeavyPRatPB",L);
		}
	} else {
		return CalcStat("BPEPRatP",L,N);
	}
}

// Support functions for CalcStat. These consist of implementations of more complex calculation types, decode methods for parameter "C" and rounding/min/max/compare functions for floating point numbers.

// ****************** Calculation Type support functions ******************

// DDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDD
// DataTableValue: Takes a value from an array table.

function DataTableValue(vDataArray, dIndex)
{
	var lIndex = RoundDbl(dIndex);
	return ((lIndex <= 1) ? vDataArray[0] : ((lIndex >= vDataArray.length) ? vDataArray[vDataArray.length-1] : vDataArray[lIndex-1]));
}

// EEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEE
// ExpFmod: Exponential function based on percentage.
// Common percentage values are around ~5.5% for between levels and ~20% jumps between level segments.

function ExpFmod(dVal, dLstart, dPlvl, dLvl, vDec, vAdd)
{
	var dRng = dLvl-dLstart+1;
	if (dRng <= DblCalcDev)
		return dVal;
	else {
		var dFac = 1+dPlvl/100;
		var dAdd = ((typeof vAdd === "undefined") ? 0 : vAdd);
		if (typeof vDec === "undefined") {
			var dFacExp = Math.pow(dFac,dRng);
			return dVal*dFacExp+dAdd*((dFacExp-1)/(dFac-1));
		}
		else {
			var dResult = dVal;
			var dLm = dLstart-DblCalcDev;
			while (dLm++ <= dLvl)
				dResult = RoundDbl(dResult*dFac+dAdd,vDec);
			return dResult;
		}
	}
}

// PPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPP
// CalcPercAB: Calculates the percentage out of a rating based on the AB formula.

function CalcPercAB(dA, dB, dPCap, dR)
{
	if (dR <= DblCalcDev)
		return 0.0;
	else {
		var dResult = dA/(1+dB/dR);
		return ((dResult >= dPCap-DblCalcDev) ? dPCap : dResult);
	}
}

// RRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRR
// CalcRatAB: Calculates the rating out of a percentage based on the AB formula.

function CalcRatAB(dA, dB, dCapR, dP)
{
	if (dP <= DblCalcDev)
		return 0.0;
	else {
		var dResult = dB/(dA/dP-1);
		return ((dResult >= dCapR-DblCalcDev) ? dCapR : dResult);
	}
}

// SSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSS
// StatLinInter: (Normalized) Stat Linear Interpolating

function StatLinInter(sPntMP, sProgScheme, sProgBase, sAdj, dLvl, vNorC, vRoundType)
{
	var dN = 1;
	var sC = "";
	if (typeof vNorC !== "undefined") {
		if (typeof vNorC === "number")
			dN = vNorC;
		else if (typeof vNorC === "string")
			sC = vNorC;
	}

	// parameter processing
	var dRoundType = (typeof vRoundType === "number") ? vRoundType : 0;
	
	var dProgScheme = CalcStat(sProgScheme,dLvl);
	if (typeof dProgScheme === "undefined") return 0.0;

	// find level interval
	var dLvlMinus = dLvl-DblCalcDev;
	var iPointIndexHigh = 1;
	var iPointIndexMax = dProgScheme[0].length-1;
	while (iPointIndexHigh < iPointIndexMax) {
		if (dLvlMinus <= dProgScheme[0][iPointIndexHigh])
			break;
		iPointIndexHigh++;
	}
	var iPointIndexLow = iPointIndexHigh-1;
		
	var dAccessLvlLow = dProgScheme[0][iPointIndexLow];
	var dAccessLvlHigh = dProgScheme[0][iPointIndexHigh];
	var dBaseLvlLow = dProgScheme[1][iPointIndexLow];
	var dBaseLvlHigh = dProgScheme[1][iPointIndexHigh];
	
	// get values from base progression
	var dValLow = CalcStat(sProgBase,dBaseLvlLow,sC);
	var dValHigh = CalcStat(sProgBase,dBaseLvlHigh,sC);

	// graph point multiplications
	if (typeof sPntMP === "string" && sPntMP.trim() != "") {
		dValLow *= CalcStat(sPntMP,dAccessLvlLow,sC);
		dValHigh *= CalcStat(sPntMP,dAccessLvlHigh,sC);
	}
	if (typeof sAdj === "string" && sAdj.trim() != "") {
		dValLow *= CalcStat(sAdj,dAccessLvlLow,sC);
		dValHigh *= CalcStat(sAdj,dAccessLvlHigh,sC);
	}
	dValLow *= dN;
	dValHigh *= dN;

	// graph point roundings
	switch (dRoundType) {
		case 0:
			dValLow = RoundDblLotro(dValLow);
			dValHigh = RoundDblLotro(dValHigh);
			break;
		case 1:
			dValLow = (-1000.0 <= dValLow && dValLow <= 1000.0) ? RoundDblUp(dValLow,2) : RoundDblLotro(dValLow);
			dValHigh = (-1000.0 <= dValHigh && dValHigh <= 1000.0) ? RoundDblUp(dValHigh,2) : RoundDblLotro(dValHigh);
			break;
		case 2:
			dValLow = RoundDblLotro(dValLow);
			dValLow = (dValLow == -1) ? -2 : dValLow;
			dValHigh = RoundDblLotro(dValHigh);
			dValHigh = (dValHigh == -1) ? -2 : dValHigh;
			break;
	}

	// return interpolated value from the calculated graph points
	return LinFmod(1,dValLow,dValHigh,dAccessLvlLow,dAccessLvlHigh,dLvl);
}

// TTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTT
// LinFmod: Linear line function between 2 points with some optional modifications.
// Connects point (dLstart,dVal*dFstart) with (dLend,dVal*dFend).
// Usually used with dVal=1 and dFstart/dFend containing unrelated points or dVal=# and dFstart/dFend containing multiplier factors.
// Modification for in-between points on the line: rounding.

function LinFmod(dVal, dFstart, dFend, dLstart, dLend, dLvl, vDec)
{
	if (dLstart-DblCalcDev <= dLvl && dLvl <= dLstart+DblCalcDev)
		return dVal*dFstart;
	else if (dLend-DblCalcDev <= dLvl && dLvl <= dLend+DblCalcDev)
		return dVal*dFend;
	else if (dLstart == dLend)
		return 0.0;
	else if (typeof vDec === "undefined")
		return dVal*(dFstart*(dLend-dLvl)+(dLvl-dLstart)*dFend)/(dLend-dLstart);
	else
		return RoundDbl(dVal*(dFstart*(dLend-dLvl)+(dLvl-dLstart)*dFend)/(dLend-dLstart),vDec);
}

// ****************** Parameter "C" decode support functions ******************

// ArmCodeIndex: returns a specified index from an Armour Code.
// sACode string:
// 1st position: H=heavy, M=medium, L=light
// 2nd position: H=head, S=shoulders, CL=cloak/back, C=chest, G=gloves, L=leggings, B=boots, Sh=shield
// 3rd position: W=white/common, Y=yellow/uncommon, P=purple/rare, T=teal/blue/incomparable, G=gold/legendary/epic
// Note: no such thing exists as a heavy, medium or light cloak, so no H/M/L in cloak codes (cloaks go automatically in the M class since U23, although historically this was L)

function ArmCodeIndex(sACode, iI)
{
	var armourcode = sACode.trim().toUpperCase();

	// get positional codes and make some corrections
	var sArmCat = armourcode.substr(0,1);
	var sArmType = armourcode.substr(1,1);
	var sArmCol = armourcode.substr(2,1);
	if (sArmType == "S" && sArmCol == "H") {
		sArmType = "SH";
		sArmCol = armourcode.substr(3,1);
	} else if (sArmCat == "C" && sArmType == "L") {
		sArmCat = "M";
		sArmType = "CL";
	} else
		sArmType = " "+sArmType;
	
	switch (iI) {
		case 1:
			var ind = "HML".indexOf(sArmCat);
			return ((ind == -1) ? 0 : ind+1);
		case 2:
			var ind = " H SCL C G L BSH".indexOf(sArmType);
			return ((ind == -1) ? 0 : (ind/2)+1);
		case 3:
			var ind = "WYPTG".indexOf(sArmCol);
			return ((ind == -1) ? 0 : ind+1);
		default:
			return 0;
	}
}

// QualityCodeIndex: returns a quality index from a Quality Code.
// sQCode string: W=white/common, Y=yellow/uncommon, P=purple/rare, T=teal/blue/incomparable, G=gold/legendary/epic

function QualityCodeIndex(sQCode)
{
	var ind = "WYPTG".indexOf(sQCode.trim().substr(0,1).toUpperCase());
	return ((ind == -1) ? 0 : ind+1);
}

// WpnCodeIndex: returns a specified index from a Weapon Code.
// sWCode string:
// 1st position: H=heavy, L=light
// 2nd position: O=one-handed, T=two-handed, B=bow
// 3rd position: W=white/common, Y=yellow/uncommon, P=purple/rare, T=teal/blue/incomparable, G=gold/legendary/epic

function WpnCodeIndex(sWCode, iI)
{
	var weaponcode = sWCode.trim().toUpperCase();
	var sWpnCat = weaponcode.substr(0,1);
	var sWpnType = weaponcode.substr(1,1);
	var sWpnCol = weaponcode.substr(2,1);
	
	switch (iI) {
		case 1:
			var ind = "HL".indexOf(sWpnCat);
			return ((ind == -1) ? 0 : ind+1);
		case 2:
			var ind = "OTB".indexOf(sWpnType);
			return ((ind == -1) ? 0 : ind+1);
		case 3:
			var ind = "WYPTG".indexOf(sWpnCol);
			return ((ind == -1) ? 0 : ind+1);
		default:
			return 0;
	}
}

// RomanRankDecode: converts a string with a Roman number in characters, to an integer number.
// used for Legendary Item Title calculation.

var RomanRankChars = ["M","CM","D","CD","C","XC","L","XL","X","IX","V","IV","I"];
var RomanRankValues = [1000,900,500,400,100,90,50,40,10,9,5,4,1];

function RomanRankDecode(sNumber)
{
	if (typeof sNumber === "string") {
		var sn = sNumber.trim().toUpperCase();
		if (sn.length > 0)
			for (var ind = 0, len = RomanRankChars.length; ind < len; ind++)
				if (sn.indexOf(RomanRankChars[ind]) == 0)
					return RomanRankValues[ind]+RomanRankDecode(sn.slice(RomanRankChars[ind].length));
	}
	return 0;
}

// ReverseCalc: tries to calculate back a calculation result to the original (integer) level.
// Does not support N.

function ReverseCalc(sStat, dNum)
{
	if (sStat.trim().length > 0) {
		var dNumMinus = dNum-DblCalcDev;
		var dNumPlus = dNum+DblCalcDev;
		var minlvl = 1;
		var maxlvl = 549;
		var devlvl = 3;
	
		var left = minlvl-1;
		var right = maxlvl;
		var middle = 0;
		
		var count = minlvl;

		while (right > left+1 && count++ <= maxlvl) {
			middle = Math.trunc((left+right)/2);
			if (CalcStat(sStat,middle) >= dNumMinus)
				right = middle;
			else
				left = middle;
		}

		var mintest = Math.max(right-devlvl,minlvl);
		var maxtest = Math.min(right+devlvl,maxlvl);

		var dFound = 0;
	
		// we check nearby in case the progression is not completely ascending/sorted.
		for (var test = mintest; test <= maxtest; test++) {
			dFound = CalcStat(sStat,test);
			if  (dNumMinus <= dFound && dFound <= dNumPlus)
				return test;
		}
	}

	return 0;
}

// ****************** Misc. floating point support functions ******************

// Misc. functions for floating point: rounding etc.
// For roundings: vDec is number of decimals.

function RoundDbl(dNum, vDec)
{
	var dCorrection = 0.5+DblCalcDev;
	var iSign = (dNum < 0) ? -1 : 1;
	
	if (typeof vDec === "undefined" || (-DblCalcDev <= vDec && vDec <= DblCalcDev))
		return iSign*Math.trunc(iSign*dNum+dCorrection);
	else {
		var dFactor = Math.pow(10,vDec);
		return iSign*Math.trunc(iSign*dNum*dFactor+dCorrection)/dFactor;
	}
}

function RoundDblDown(dNum, vDec)
{
	var dCorrection = DblCalcDev;
	var iSign = (dNum < 0) ? -1 : 1;
	
	if (typeof vDec === "undefined" || (-DblCalcDev <= vDec && vDec <= DblCalcDev))
		return iSign*Math.trunc(iSign*dNum+dCorrection);
	else {
		var dFactor = Math.pow(10,vDec);
		return iSign*Math.trunc(iSign*dNum*dFactor+dCorrection)/dFactor;
	}
}

function RoundDblUp(dNum, vDec)
{
	var dCorrection = 1-DblCalcDev;
	var iSign = (dNum < 0) ? -1 : 1;
	
	if (typeof vDec === "undefined" || (-DblCalcDev <= vDec && vDec <= DblCalcDev))
		return iSign*Math.trunc(iSign*dNum+dCorrection);
	else {
		var dFactor = Math.pow(10,vDec);
		return iSign*Math.trunc(iSign*dNum*dFactor+dCorrection)/dFactor;
	}
}

function RoundDblLotro(dNum)
{
	var dCorrection = 1-DblCalcDev;
	var iSign = (dNum < 0) ? -1 : 1;

	var iNumCeiled = Math.trunc(iSign*dNum+dCorrection);
	if (iNumCeiled <= 1000)
		return iSign*iNumCeiled;

	var iFactor = 1;
	var iTestNum = Math.trunc(iNumCeiled/1000);
	while (iTestNum > 0) {
		iTestNum = Math.trunc(iTestNum/10);
		iFactor *= 10;
	}

	return iSign*Math.trunc(iNumCeiled/iFactor+dCorrection)*iFactor;
}
