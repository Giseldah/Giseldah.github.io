// Created by Giseldah

// Floating point numbers bring errors into the calculation, both inside the Lotro-client and in this function collection. This is why a 100% match with the stats in Lotro is impossible.
// Anyway, to compensate for some errors, we use a calculation deviation correction value. This makes for instance 24.49999999 round to 25, as it's assumed that 24.5 was intended as outcome of a formula.
var DblCalcDev = 0.00000001;

function CalcStat(SName, SLvl, SParam)
{
	var SN = SName.trim().toUpperCase();
	var L = SLvl;
	var N = 1;
	var C = "";
	if (typeof SParam !== "undefined") {
		if (typeof SParam === "number" )
			N = SParam;
		else
			C = SParam;
	}

	if (SN < "PARTEVADEMITPBONUS") {
		if (SN < "INDMGPRATPC") {
			if (SN < "CRITHITPRATPA") {
				if (SN < "BPEPRATPCAPR") {
					if (SN < "BLOCKPRATPB") {
						if (SN < "BEORNINGCDARMOURTYPE") {
							if (SN < "ADJTRAITPROGRATINGS") {
								if (SN == "-VERSION") {
									return "1.8.1b8p";
								} else {
									return 0;
								}
							} else if (SN > "ADJTRAITPROGRATINGS") {
								if (SN > "ARMOURT") {
									if (SN == "ARMOURTADJ") {
										if (L-DblCalcDev <= 130) {
											return CalcStat("AdjTraitProgRatings",L);
										} else {
											return 80/90;
										}
									} else {
										return 0;
									}
								} else if (SN == "ARMOURT") {
									return LinFmod(1,LotroDbl(CalcStat("PntMPArmour",L)*CalcStat("TraitProgVPL",L,CalcStat("ProgBMitigation",L))*CalcStat("ArmourTAdj",CalcStat("TraitProgLPL",L))*N),LotroDbl(CalcStat("PntMPArmour",L)*CalcStat("TraitProgVPH",L,CalcStat("ProgBMitigation",L))*CalcStat("ArmourTAdj",CalcStat("TraitProgLPH",L))*N),CalcStat("TraitProgLPL",L),CalcStat("TraitProgLPH",L),L);
								} else {
									return 0;
								}
							} else {
								if (L-DblCalcDev <= 1) {
									return 1;
								} else if (L-DblCalcDev <= 105) {
									return 0.8;
								} else if (L-DblCalcDev <= 121) {
									return 1;
								} else {
									return 0.9;
								}
							}
						} else if (SN > "BEORNINGCDARMOURTYPE") {
							if (SN < "BLOCKPPRAT") {
								if (SN > "BEORNINGCDCANBLOCK") {
									if (SN == "BLOCKPBONUS") {
										return CalcStat("BPEPBonus",L);
									} else {
										return 0;
									}
								} else if (SN == "BEORNINGCDCANBLOCK") {
									if (L-DblCalcDev <= 5) {
										return 0;
									} else {
										return 1;
									}
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
							return 3;
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
							if (SN < "BPEPRATPB") {
								if (SN > "BPEPRATP") {
									if (SN == "BPEPRATPA") {
										if (L-DblCalcDev <= 130) {
											return 26;
										} else {
											return 39;
										}
									} else {
										return 0;
									}
								} else if (SN == "BPEPRATP") {
									return CalcPercAB(CalcStat("BPEPRatPA",L),CalcStat("BPEPRatPB",L),CalcStat("BPEPRatPCap",L),N);
								} else {
									return 0;
								}
							} else if (SN > "BPEPRATPB") {
								if (SN > "BPEPRATPC") {
									if (SN == "BPEPRATPCAP") {
										return 13;
									} else {
										return 0;
									}
								} else if (SN == "BPEPRATPC") {
									if (L-DblCalcDev <= 130) {
										return 1;
									} else {
										return 0.5;
									}
								} else {
									return 0;
								}
							} else {
								if (L-DblCalcDev <= 130) {
									return CalcStat("BratProgAlt",L,CalcStat("ProgBLow",L));
								} else {
									return CalcStat("BratProgAlt",L,CalcStat("ProgBLowNew",L));
								}
							}
						} else {
							return CalcRatAB(CalcStat("BPEPRatPA",L),CalcStat("BPEPRatPB",L),CalcStat("BPEPRatPCapR",L),N);
						}
					} else {
						return CalcStat("BPEPRatPB",L);
					}
				} else if (SN > "BPEPRATPCAPR") {
					if (SN < "CRITDEFPBONUS") {
						if (SN < "BRAWLERCDARMOURTYPE") {
							if (SN < "BPETADJ") {
								if (SN == "BPET") {
									return LinFmod(1,LotroDbl(CalcStat("PntMPRatings",L)*CalcStat("TraitProgAltVPL",L,CalcStat("ProgBLow",L))*CalcStat("BPETAdj",CalcStat("TraitProgAltLPL",L))*N),LotroDbl(CalcStat("PntMPRatings",L)*CalcStat("TraitProgAltVPH",L,CalcStat("ProgBLow",L))*CalcStat("BPETAdj",CalcStat("TraitProgAltLPH",L))*N),CalcStat("TraitProgAltLPL",L),CalcStat("TraitProgAltLPH",L),L);
								} else {
									return 0;
								}
							} else if (SN > "BPETADJ") {
								if (SN > "BRATPROG") {
									if (SN == "BRATPROGALT") {
										if (L-DblCalcDev <= 75) {
											return LinFmod(RoundDbl(N),1,75,1,75,L);
										} else if (L-DblCalcDev <= 76) {
											return LinFmod(1,RoundDbl(N)*75,CalcStat("StdProgAlt",76,N),75,76,L);
										} else if (L-DblCalcDev <= 100) {
											return LinFmod(1,CalcStat("StdProgAlt",76,N),CalcStat("StdProgAlt",100,N),75,100,L,-1);
										} else if (L-DblCalcDev <= 101) {
											return CalcStat("StdProgAlt",L,N);
										} else if (L-DblCalcDev <= 105) {
											return LinFmod(1,CalcStat("StdProgAlt",101,N),CalcStat("StdProgAlt",105,N),100,105,L,-1);
										} else if (L-DblCalcDev <= 106) {
											return CalcStat("StdProgAlt",L,N);
										} else if (L-DblCalcDev <= 115) {
											return LinFmod(1,CalcStat("StdProgAlt",106,N),CalcStat("StdProgAlt",115,N),106,115,L,-1);
										} else if (L-DblCalcDev <= 116) {
											return CalcStat("StdProgAlt",L,N);
										} else if (L-DblCalcDev <= 120) {
											return LinFmod(1,CalcStat("StdProgAlt",116,N),CalcStat("StdProgAlt",120,N),116,120,L,-1);
										} else if (L-DblCalcDev <= 121) {
											return CalcStat("StdProgAlt",L,N);
										} else if (L-DblCalcDev <= 130) {
											return LinFmod(1,CalcStat("StdProgAlt",121,N),CalcStat("StdProgAlt",130,N),121,130,L,-1);
										} else if (L-DblCalcDev <= 131) {
											return CalcStat("StdProgAlt",L,N);
										} else {
											return LinFmod(1,CalcStat("StdProgAlt",131,N),CalcStat("StdProgAlt",131,N)*2,131,140,L,-1);
										}
									} else {
										return 0;
									}
								} else if (SN == "BRATPROG") {
									if (L-DblCalcDev <= 75) {
										return LinFmod(RoundDbl(N),1,75,1,75,L);
									} else if (L-DblCalcDev <= 76) {
										return LinFmod(1,RoundDbl(N)*75,CalcStat("StdProg",76,N),75,76,L);
									} else if (L-DblCalcDev <= 100) {
										return LinFmod(1,CalcStat("StdProg",76,N),CalcStat("StdProg",100,N),75,100,L,-1);
									} else if (L-DblCalcDev <= 101) {
										return CalcStat("StdProg",L,N);
									} else if (L-DblCalcDev <= 105) {
										return LinFmod(1,CalcStat("StdProg",101,N),CalcStat("StdProg",105,N),100,105,L,-1);
									} else if (L-DblCalcDev <= 106) {
										return CalcStat("StdProg",L,N);
									} else if (L-DblCalcDev <= 115) {
										return LinFmod(1,CalcStat("StdProg",106,N),CalcStat("StdProg",115,N),106,115,L,-1);
									} else if (L-DblCalcDev <= 116) {
										return CalcStat("StdProg",L,N);
									} else if (L-DblCalcDev <= 120) {
										return LinFmod(1,CalcStat("StdProg",116,N),CalcStat("StdProg",120,N),116,120,L,-1);
									} else if (L-DblCalcDev <= 121) {
										return CalcStat("StdProg",L,N);
									} else if (L-DblCalcDev <= 130) {
										return LinFmod(1,CalcStat("StdProg",121,N),CalcStat("StdProg",130,N),121,130,L,-1);
									} else if (L-DblCalcDev <= 131) {
										return LinFmod(1,CalcStat("StdProg",130,N),RoundDbl(CalcStat("StdProg",131,N),-3),130,131,L);
									} else {
										return LinFmod(1,RoundDbl(CalcStat("StdProg",131,N),-3),RoundDbl(CalcStat("StdProg",131,N),-3)*2,131,140,L,-1);
									}
								} else {
									return 0;
								}
							} else {
								if (L-DblCalcDev <= 130) {
									return CalcStat("AdjTraitProgRatings",L);
								} else if (L-DblCalcDev <= 131) {
									return 11/9.0;
								} else {
									return 40/30;
								}
							}
						} else if (SN > "BRAWLERCDARMOURTYPE") {
							if (SN < "CAPTAINCDCANBLOCK") {
								if (SN > "BURGLARCDARMOURTYPE") {
									if (SN == "CAPTAINCDARMOURTYPE") {
										return 3;
									} else {
										return 0;
									}
								} else if (SN == "BURGLARCDARMOURTYPE") {
									return 2;
								} else {
									return 0;
								}
							} else if (SN > "CAPTAINCDCANBLOCK") {
								if (SN > "CHAMPIONCDARMOURTYPE") {
									if (SN == "CHAMPIONCDCANBLOCK") {
										if (L-DblCalcDev <= 9) {
											return 0;
										} else {
											return 1;
										}
									} else {
										return 0;
									}
								} else if (SN == "CHAMPIONCDARMOURTYPE") {
									return 3;
								} else {
									return 0;
								}
							} else {
								if (L-DblCalcDev <= 14) {
									return 0;
								} else {
									return 1;
								}
							}
						} else {
							return 3;
						}
					} else if (SN > "CRITDEFPBONUS") {
						if (SN < "CRITDEFPRATPC") {
							if (SN < "CRITDEFPRATP") {
								if (SN == "CRITDEFPPRAT") {
									return CalcRatAB(CalcStat("CritDefPRatPA",L),CalcStat("CritDefPRatPB",L),CalcStat("CritDefPRatPCapR",L),N);
								} else {
									return 0;
								}
							} else if (SN > "CRITDEFPRATP") {
								if (SN > "CRITDEFPRATPA") {
									if (SN == "CRITDEFPRATPB") {
										if (L-DblCalcDev <= 130) {
											return CalcStat("BratProgAlt",L,CalcStat("ProgBLow",L));
										} else {
											return CalcStat("BratProgAlt",L,CalcStat("ProgBLowNew",L));
										}
									} else {
										return 0;
									}
								} else if (SN == "CRITDEFPRATPA") {
									if (L-DblCalcDev <= 130) {
										return 160;
									} else {
										return 240;
									}
								} else {
									return 0;
								}
							} else {
								return CalcPercAB(CalcStat("CritDefPRatPA",L),CalcStat("CritDefPRatPB",L),CalcStat("CritDefPRatPCap",L),N);
							}
						} else if (SN > "CRITDEFPRATPC") {
							if (SN < "CRITHITPBONUS") {
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
							} else if (SN > "CRITHITPBONUS") {
								if (SN > "CRITHITPPRAT") {
									if (SN == "CRITHITPRATP") {
										return CalcPercAB(CalcStat("CritHitPRatPA",L),CalcStat("CritHitPRatPB",L),CalcStat("CritHitPRatPCap",L),N);
									} else {
										return 0;
									}
								} else if (SN == "CRITHITPPRAT") {
									return CalcRatAB(CalcStat("CritHitPRatPA",L),CalcStat("CritHitPRatPB",L),CalcStat("CritHitPRatPCapR",L),N);
								} else {
									return 0;
								}
							} else {
								return 0;
							}
						} else {
							if (L-DblCalcDev <= 130) {
								return 1;
							} else {
								return 0.5;
							}
						}
					} else {
						return 0;
					}
				} else {
					return CalcStat("BPEPRatPB",L)*CalcStat("BPEPRatPC",L);
				}
			} else if (SN > "CRITHITPRATPA") {
				if (SN < "EVADEPPRAT") {
					if (SN < "CRITMAGNPRATPCAP") {
						if (SN < "CRITMAGNPBONUS") {
							if (SN < "CRITHITPRATPC") {
								if (SN == "CRITHITPRATPB") {
									if (L-DblCalcDev <= 130) {
										return CalcStat("BratProgAlt",L,CalcStat("ProgBLow",L));
									} else {
										return CalcStat("BratProgAlt",L,CalcStat("ProgBLowNew",L));
									}
								} else {
									return 0;
								}
							} else if (SN > "CRITHITPRATPC") {
								if (SN > "CRITHITPRATPCAP") {
									if (SN == "CRITHITPRATPCAPR") {
										return CalcStat("CritHitPRatPB",L)*CalcStat("CritHitPRatPC",L);
									} else {
										return 0;
									}
								} else if (SN == "CRITHITPRATPCAP") {
									return 25;
								} else {
									return 0;
								}
							} else {
								if (L-DblCalcDev <= 130) {
									return 1;
								} else {
									return 0.5;
								}
							}
						} else if (SN > "CRITMAGNPBONUS") {
							if (SN < "CRITMAGNPRATPA") {
								if (SN > "CRITMAGNPPRAT") {
									if (SN == "CRITMAGNPRATP") {
										return CalcPercAB(CalcStat("CritMagnPRatPA",L),CalcStat("CritMagnPRatPB",L),CalcStat("CritMagnPRatPCap",L),N);
									} else {
										return 0;
									}
								} else if (SN == "CRITMAGNPPRAT") {
									return CalcRatAB(CalcStat("CritMagnPRatPA",L),CalcStat("CritMagnPRatPB",L),CalcStat("CritMagnPRatPCapR",L),N);
								} else {
									return 0;
								}
							} else if (SN > "CRITMAGNPRATPA") {
								if (SN > "CRITMAGNPRATPB") {
									if (SN == "CRITMAGNPRATPC") {
										return CalcStat("CritMagnPRatPCAP",L)/(CalcStat("CritMagnPRatPA",L)-CalcStat("CritMagnPRatPCAP",L));
									} else {
										return 0;
									}
								} else if (SN == "CRITMAGNPRATPB") {
									if (L-DblCalcDev <= 130) {
										return CalcStat("BratProg",L,CalcStat("ProgBHigh",L));
									} else {
										return CalcStat("BratProg",L,CalcStat("ProgBHighNew",L));
									}
								} else {
									return 0;
								}
							} else {
								if (L-DblCalcDev <= 120) {
									return 200;
								} else if (L-DblCalcDev <= 127) {
									return (-5)*L+750;
								} else if (L-DblCalcDev <= 130) {
									return 112.5;
								} else {
									return 225;
								}
							}
						} else {
							return 0;
						}
					} else if (SN > "CRITMAGNPRATPCAP") {
						if (SN < "DEVHITPRATPA") {
							if (SN < "DEVHITPBONUS") {
								if (SN == "CRITMAGNPRATPCAPR") {
									return CalcStat("CritMagnPRatPB",L)*CalcStat("CritMagnPRatPC",L);
								} else {
									return 0;
								}
							} else if (SN > "DEVHITPBONUS") {
								if (SN > "DEVHITPPRAT") {
									if (SN == "DEVHITPRATP") {
										return CalcPercAB(CalcStat("DevHitPRatPA",L),CalcStat("DevHitPRatPB",L),CalcStat("DevHitPRatPCap",L),N);
									} else {
										return 0;
									}
								} else if (SN == "DEVHITPPRAT") {
									return CalcRatAB(CalcStat("DevHitPRatPA",L),CalcStat("DevHitPRatPB",L),CalcStat("DevHitPRatPCapR",L),N);
								} else {
									return 0;
								}
							} else {
								return 0;
							}
						} else if (SN > "DEVHITPRATPA") {
							if (SN < "DEVHITPRATPCAP") {
								if (SN > "DEVHITPRATPB") {
									if (SN == "DEVHITPRATPC") {
										if (L-DblCalcDev <= 130) {
											return 1;
										} else {
											return 0.5;
										}
									} else {
										return 0;
									}
								} else if (SN == "DEVHITPRATPB") {
									if (L-DblCalcDev <= 130) {
										return CalcStat("BratProg",L,CalcStat("ProgBMedium",L));
									} else {
										return CalcStat("BratProg",L,CalcStat("ProgBMediumNew",L));
									}
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
						} else {
							if (L-DblCalcDev <= 130) {
								return 20;
							} else {
								return 30;
							}
						}
					} else {
						if (L-DblCalcDev <= 120) {
							return 100;
						} else {
							return 75;
						}
					}
				} else if (SN > "EVADEPPRAT") {
					if (SN < "FINESSEPRATPB") {
						if (SN < "EVADEPRATPCAP") {
							if (SN < "EVADEPRATPA") {
								if (SN == "EVADEPRATP") {
									return CalcStat("BPEPRatP",L,N);
								} else {
									return 0;
								}
							} else if (SN > "EVADEPRATPA") {
								if (SN > "EVADEPRATPB") {
									if (SN == "EVADEPRATPC") {
										return CalcStat("BPEPRatPC",L);
									} else {
										return 0;
									}
								} else if (SN == "EVADEPRATPB") {
									return CalcStat("BPEPRatPB",L);
								} else {
									return 0;
								}
							} else {
								return CalcStat("BPEPRatPA",L);
							}
						} else if (SN > "EVADEPRATPCAP") {
							if (SN < "FINESSEPPRAT") {
								if (SN > "EVADEPRATPCAPR") {
									if (SN == "FINESSEPBONUS") {
										return 0;
									} else {
										return 0;
									}
								} else if (SN == "EVADEPRATPCAPR") {
									return CalcStat("BPEPRatPCapR",L);
								} else {
									return 0;
								}
							} else if (SN > "FINESSEPPRAT") {
								if (SN > "FINESSEPRATP") {
									if (SN == "FINESSEPRATPA") {
										if (L-DblCalcDev <= 130) {
											return 100;
										} else {
											return 150;
										}
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
						} else {
							return CalcStat("BPEPRatPCap",L);
						}
					} else if (SN > "FINESSEPRATPB") {
						if (SN < "HUNTERCDARMOURTYPE") {
							if (SN < "FINESSEPRATPCAPR") {
								if (SN > "FINESSEPRATPC") {
									if (SN == "FINESSEPRATPCAP") {
										return 50;
									} else {
										return 0;
									}
								} else if (SN == "FINESSEPRATPC") {
									if (L-DblCalcDev <= 130) {
										return 1;
									} else {
										return 0.5;
									}
								} else {
									return 0;
								}
							} else if (SN > "FINESSEPRATPCAPR") {
								if (SN > "GUARDIANCDARMOURTYPE") {
									if (SN == "GUARDIANCDCANBLOCK") {
										return 1;
									} else {
										return 0;
									}
								} else if (SN == "GUARDIANCDARMOURTYPE") {
									return 3;
								} else {
									return 0;
								}
							} else {
								return CalcStat("FinessePRatPB",L)*CalcStat("FinessePRatPC",L);
							}
						} else if (SN > "HUNTERCDARMOURTYPE") {
							if (SN < "INDMGPRATP") {
								if (SN > "INDMGPBONUS") {
									if (SN == "INDMGPPRAT") {
										return CalcRatAB(CalcStat("InDmgPRatPA",L),CalcStat("InDmgPRatPB",L),CalcStat("InDmgPRatPCapR",L),N);
									} else {
										return 0;
									}
								} else if (SN == "INDMGPBONUS") {
									return 0;
								} else {
									return 0;
								}
							} else if (SN > "INDMGPRATP") {
								if (SN > "INDMGPRATPA") {
									if (SN == "INDMGPRATPB") {
										if (L-DblCalcDev <= 130) {
											return CalcStat("BratProg",L,CalcStat("ProgBDefence",L));
										} else {
											return CalcStat("BratProg",L,CalcStat("ProgBDefenceNew",L));
										}
									} else {
										return 0;
									}
								} else if (SN == "INDMGPRATPA") {
									if (L-DblCalcDev <= 130) {
										return 800;
									} else {
										return 1200;
									}
								} else {
									return 0;
								}
							} else {
								return CalcPercAB(CalcStat("InDmgPRatPA",L),CalcStat("InDmgPRatPB",L),CalcStat("InDmgPRatPCap",L),N);
							}
						} else {
							return 2;
						}
					} else {
						if (L-DblCalcDev <= 130) {
							return CalcStat("BratProgAlt",L,CalcStat("ProgBLow",L));
						} else {
							return CalcStat("BratProgAlt",L,CalcStat("ProgBLowNew",L));
						}
					}
				} else {
					return CalcStat("BPEPPRat",L,N);
				}
			} else {
				if (L-DblCalcDev <= 130) {
					return 50;
				} else {
					return 75;
				}
			}
		} else if (SN > "INDMGPRATPC") {
			if (SN < "OUTDMGPRATPA") {
				if (SN < "MITHEAVYPRATPC") {
					if (SN < "LEVELCAP") {
						if (SN < "INHEALPRATP") {
							if (SN < "INDMGPRATPCAPR") {
								if (SN == "INDMGPRATPCAP") {
									return 400;
								} else {
									return 0;
								}
							} else if (SN > "INDMGPRATPCAPR") {
								if (SN > "INHEALPBONUS") {
									if (SN == "INHEALPPRAT") {
										return CalcRatAB(CalcStat("InHealPRatPA",L),CalcStat("InHealPRatPB",L),CalcStat("InHealPRatPCapR",L),N);
									} else {
										return 0;
									}
								} else if (SN == "INHEALPBONUS") {
									return 0;
								} else {
									return 0;
								}
							} else {
								return CalcStat("InDmgPRatPB",L)*CalcStat("InDmgPRatPC",L);
							}
						} else if (SN > "INHEALPRATP") {
							if (SN < "INHEALPRATPC") {
								if (SN > "INHEALPRATPA") {
									if (SN == "INHEALPRATPB") {
										if (L-DblCalcDev <= 130) {
											return CalcStat("BratProgAlt",L,CalcStat("ProgBLow",L));
										} else {
											return CalcStat("BratProgAlt",L,CalcStat("ProgBLowNew",L));
										}
									} else {
										return 0;
									}
								} else if (SN == "INHEALPRATPA") {
									if (L-DblCalcDev <= 130) {
										return 50;
									} else {
										return 75;
									}
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
								if (L-DblCalcDev <= 130) {
									return 1;
								} else {
									return 0.5;
								}
							}
						} else {
							return CalcPercAB(CalcStat("InHealPRatPA",L),CalcStat("InHealPRatPB",L),CalcStat("InHealPRatPCap",L),N);
						}
					} else if (SN > "LEVELCAP") {
						if (SN < "MINSTRELCDCANBLOCK") {
							if (SN < "LVLEXPCOST") {
								if (SN == "LOREMASTERCDARMOURTYPE") {
									return 1;
								} else {
									return 0;
								}
							} else if (SN > "LVLEXPCOST") {
								if (SN > "LVLEXPCOSTTOT") {
									if (SN == "MINSTRELCDARMOURTYPE") {
										return 1;
									} else {
										return 0;
									}
								} else if (SN == "LVLEXPCOSTTOT") {
									if (L-DblCalcDev <= 1) {
										return 0;
									} else {
										return CalcStat("LvlExpCostTot",L-1)+CalcStat("LvlExpCost",L);
									}
								} else {
									return 0;
								}
							} else {
								if (L-DblCalcDev <= 1) {
									return 0;
								} else if (L-DblCalcDev <= 5) {
									return RoundDbl(12.5*L*L+12.5666666666667*L+24.8666666666667);
								} else if (L-DblCalcDev <= 10) {
									return RoundDbl(33.8*L*L-179.48*L+452.6);
								} else if (L-DblCalcDev <= 15) {
									return RoundDbl(55.05*L*L-583.77*L+2370.5);
								} else if (L-DblCalcDev <= 20) {
									return RoundDbl(76.2*L*L-1196.96*L+6809);
								} else if (L-DblCalcDev <= 25) {
									return RoundDbl(97.4*L*L-2023*L+14849.8);
								} else if (L-DblCalcDev <= 30) {
									return RoundDbl(118.7*L*L-3066.02 *L+27612.8);
								} else if (L-DblCalcDev <= 35) {
									return RoundDbl(139.95*L*L-4319.23*L+46084.1);
								} else if (L-DblCalcDev <= 40) {
									return RoundDbl(161.2*L*L-5785.04*L+71356.2);
								} else if (L-DblCalcDev <= 45) {
									return RoundDbl(182.5*L*L-7467.38*L+104569.8);
								} else if (L-DblCalcDev <= 50) {
									return RoundDbl(203.8*L*L-9363.48*L+146761.8);
								} else if (L-DblCalcDev <= 55) {
									return RoundDbl(225.05*L*L-11467.77*L+198851.3);
								} else if (L-DblCalcDev <= 60) {
									return RoundDbl(246.3*L*L-13784.46*L+261988);
								} else if (L-DblCalcDev <= 70) {
									return RoundDbl(ExpFmod(CalcStat("LvlExpCost",60),61,5.071,L,undefined,3.485));
								} else if (L-DblCalcDev <= 75) {
									return RoundDbl(ExpFmod(CalcStat("LvlExpCost",70),71,5.072,L,undefined,-0.95));
								} else {
									return ExpFmod(CalcStat("LvlExpCost",75),76,5,L,0,-0.5);
								}
							}
						} else if (SN > "MINSTRELCDCANBLOCK") {
							if (SN < "MITHEAVYPRATP") {
								if (SN > "MITHEAVYPBONUS") {
									if (SN == "MITHEAVYPPRAT") {
										return CalcRatAB(CalcStat("MitHeavyPRatPA",L),CalcStat("MitHeavyPRatPB",L),CalcStat("MitHeavyPRatPCapR",L),N);
									} else {
										return 0;
									}
								} else if (SN == "MITHEAVYPBONUS") {
									return 0;
								} else {
									return 0;
								}
							} else if (SN > "MITHEAVYPRATP") {
								if (SN > "MITHEAVYPRATPA") {
									if (SN == "MITHEAVYPRATPB") {
										if (L-DblCalcDev <= 130) {
											return CalcStat("BratProg",L,CalcStat("ProgBMitHeavy",L));
										} else {
											return CalcStat("BratProg",L,CalcStat("ProgBMitHeavyNew",L));
										}
									} else {
										return 0;
									}
								} else if (SN == "MITHEAVYPRATPA") {
									if (L-DblCalcDev <= 130) {
										return 110;
									} else {
										return 180;
									}
								} else {
									return 0;
								}
							} else {
								return CalcPercAB(CalcStat("MitHeavyPRatPA",L),CalcStat("MitHeavyPRatPB",L),CalcStat("MitHeavyPRatPCap",L),N);
							}
						} else {
							if (L-DblCalcDev <= 19) {
								return 0;
							} else {
								return 1;
							}
						}
					} else {
						return 140;
					}
				} else if (SN > "MITHEAVYPRATPC") {
					if (SN < "MITMEDIUMPBONUS") {
						if (SN < "MITLIGHTPRATP") {
							if (SN < "MITHEAVYPRATPCAPR") {
								if (SN == "MITHEAVYPRATPCAP") {
									return 60;
								} else {
									return 0;
								}
							} else if (SN > "MITHEAVYPRATPCAPR") {
								if (SN > "MITLIGHTPBONUS") {
									if (SN == "MITLIGHTPPRAT") {
										return CalcRatAB(CalcStat("MitLightPRatPA",L),CalcStat("MitLightPRatPB",L),CalcStat("MitLightPRatPCapR",L),N);
									} else {
										return 0;
									}
								} else if (SN == "MITLIGHTPBONUS") {
									return 0;
								} else {
									return 0;
								}
							} else {
								return CalcStat("MitHeavyPRatPB",L)*CalcStat("MitHeavyPRatPC",L);
							}
						} else if (SN > "MITLIGHTPRATP") {
							if (SN < "MITLIGHTPRATPC") {
								if (SN > "MITLIGHTPRATPA") {
									if (SN == "MITLIGHTPRATPB") {
										if (L-DblCalcDev <= 130) {
											return CalcStat("BratProg",L,CalcStat("ProgBMitLight",L));
										} else {
											return CalcStat("BratProg",L,CalcStat("ProgBMitLightNew",L));
										}
									} else {
										return 0;
									}
								} else if (SN == "MITLIGHTPRATPA") {
									if (L-DblCalcDev <= 130) {
										return 65;
									} else {
										return 120;
									}
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
								if (L-DblCalcDev <= 130) {
									return 1.6;
								} else {
									return 0.5;
								}
							}
						} else {
							return CalcPercAB(CalcStat("MitLightPRatPA",L),CalcStat("MitLightPRatPB",L),CalcStat("MitLightPRatPCap",L),N);
						}
					} else if (SN > "MITMEDIUMPBONUS") {
						if (SN < "MITMEDIUMPRATPC") {
							if (SN < "MITMEDIUMPRATP") {
								if (SN == "MITMEDIUMPPRAT") {
									return CalcRatAB(CalcStat("MitMediumPRatPA",L),CalcStat("MitMediumPRatPB",L),CalcStat("MitMediumPRatPCapR",L),N);
								} else {
									return 0;
								}
							} else if (SN > "MITMEDIUMPRATP") {
								if (SN > "MITMEDIUMPRATPA") {
									if (SN == "MITMEDIUMPRATPB") {
										if (L-DblCalcDev <= 130) {
											return CalcStat("BratProg",L,CalcStat("ProgBMitMedium",L));
										} else {
											return CalcStat("BratProg",L,CalcStat("ProgBMitMediumNew",L));
										}
									} else {
										return 0;
									}
								} else if (SN == "MITMEDIUMPRATPA") {
									if (L-DblCalcDev <= 130) {
										return 85;
									} else {
										return 150;
									}
								} else {
									return 0;
								}
							} else {
								return CalcPercAB(CalcStat("MitMediumPRatPA",L),CalcStat("MitMediumPRatPB",L),CalcStat("MitMediumPRatPCap",L),N);
							}
						} else if (SN > "MITMEDIUMPRATPC") {
							if (SN < "OUTDMGPBONUS") {
								if (SN > "MITMEDIUMPRATPCAP") {
									if (SN == "MITMEDIUMPRATPCAPR") {
										return CalcStat("MitMediumPRatPB",L)*CalcStat("MitMediumPRatPC",L);
									} else {
										return 0;
									}
								} else if (SN == "MITMEDIUMPRATPCAP") {
									return 50;
								} else {
									return 0;
								}
							} else if (SN > "OUTDMGPBONUS") {
								if (SN > "OUTDMGPPRAT") {
									if (SN == "OUTDMGPRATP") {
										return CalcPercAB(CalcStat("OutDmgPRatPA",L),CalcStat("OutDmgPRatPB",L),CalcStat("OutDmgPRatPCap",L),N);
									} else {
										return 0;
									}
								} else if (SN == "OUTDMGPPRAT") {
									return CalcRatAB(CalcStat("OutDmgPRatPA",L),CalcStat("OutDmgPRatPB",L),CalcStat("OutDmgPRatPCapR",L),N);
								} else {
									return 0;
								}
							} else {
								return 0;
							}
						} else {
							if (L-DblCalcDev <= 130) {
								return 100/70;
							} else {
								return 0.5;
							}
						}
					} else {
						return 0;
					}
				} else {
					if (L-DblCalcDev <= 130) {
						return 1.2;
					} else {
						return 0.5;
					}
				}
			} else if (SN > "OUTDMGPRATPA") {
				if (SN < "PARTBLOCKMITPPRAT") {
					if (SN < "OUTHEALPRATPCAP") {
						if (SN < "OUTHEALPBONUS") {
							if (SN < "OUTDMGPRATPC") {
								if (SN == "OUTDMGPRATPB") {
									if (L-DblCalcDev <= 130) {
										return CalcStat("BratProg",L,CalcStat("ProgBMastery",L));
									} else {
										return CalcStat("BratProg",L,CalcStat("ProgBMasteryNew",L));
									}
								} else {
									return 0;
								}
							} else if (SN > "OUTDMGPRATPC") {
								if (SN > "OUTDMGPRATPCAP") {
									if (SN == "OUTDMGPRATPCAPR") {
										return CalcStat("OutDmgPRatPB",L)*CalcStat("OutDmgPRatPC",L);
									} else {
										return 0;
									}
								} else if (SN == "OUTDMGPRATPCAP") {
									return 200;
								} else {
									return 0;
								}
							} else {
								if (L-DblCalcDev <= 130) {
									return 1;
								} else {
									return 0.5;
								}
							}
						} else if (SN > "OUTHEALPBONUS") {
							if (SN < "OUTHEALPRATPA") {
								if (SN > "OUTHEALPPRAT") {
									if (SN == "OUTHEALPRATP") {
										return CalcPercAB(CalcStat("OutHealPRatPA",L),CalcStat("OutHealPRatPB",L),CalcStat("OutHealPRatPCap",L),N);
									} else {
										return 0;
									}
								} else if (SN == "OUTHEALPPRAT") {
									return CalcRatAB(CalcStat("OutHealPRatPA",L),CalcStat("OutHealPRatPB",L),CalcStat("OutHealPRatPCapR",L),N);
								} else {
									return 0;
								}
							} else if (SN > "OUTHEALPRATPA") {
								if (SN > "OUTHEALPRATPB") {
									if (SN == "OUTHEALPRATPC") {
										if (L-DblCalcDev <= 130) {
											return 1;
										} else {
											return 0.5;
										}
									} else {
										return 0;
									}
								} else if (SN == "OUTHEALPRATPB") {
									if (L-DblCalcDev <= 130) {
										return CalcStat("BratProg",L,CalcStat("ProgBMedium",L));
									} else {
										return CalcStat("BratProg",L,CalcStat("ProgBMediumNew",L));
									}
								} else {
									return 0;
								}
							} else {
								if (L-DblCalcDev <= 130) {
									return 140;
								} else {
									return 210;
								}
							}
						} else {
							return 0;
						}
					} else if (SN > "OUTHEALPRATPCAP") {
						if (SN < "PARRYPRATPA") {
							if (SN < "PARRYPBONUS") {
								if (SN == "OUTHEALPRATPCAPR") {
									return CalcStat("OutHealPRatPB",L)*CalcStat("OutHealPRatPC",L);
								} else {
									return 0;
								}
							} else if (SN > "PARRYPBONUS") {
								if (SN > "PARRYPPRAT") {
									if (SN == "PARRYPRATP") {
										return CalcStat("BPEPRatP",L,N);
									} else {
										return 0;
									}
								} else if (SN == "PARRYPPRAT") {
									return CalcStat("BPEPPRat",L,N);
								} else {
									return 0;
								}
							} else {
								return CalcStat("BPEPBonus",L);
							}
						} else if (SN > "PARRYPRATPA") {
							if (SN < "PARRYPRATPCAP") {
								if (SN > "PARRYPRATPB") {
									if (SN == "PARRYPRATPC") {
										return CalcStat("BPEPRatPC",L);
									} else {
										return 0;
									}
								} else if (SN == "PARRYPRATPB") {
									return CalcStat("BPEPRatPB",L);
								} else {
									return 0;
								}
							} else if (SN > "PARRYPRATPCAP") {
								if (SN > "PARRYPRATPCAPR") {
									if (SN == "PARTBLOCKMITPBONUS") {
										return CalcStat("PartMitPBonus",L);
									} else {
										return 0;
									}
								} else if (SN == "PARRYPRATPCAPR") {
									return CalcStat("BPEPRatPCapR",L);
								} else {
									return 0;
								}
							} else {
								return CalcStat("BPEPRatPCap",L);
							}
						} else {
							return CalcStat("BPEPRatPA",L);
						}
					} else {
						return 70;
					}
				} else if (SN > "PARTBLOCKMITPPRAT") {
					if (SN < "PARTBLOCKPRATPB") {
						if (SN < "PARTBLOCKMITPRATPCAP") {
							if (SN < "PARTBLOCKMITPRATPA") {
								if (SN == "PARTBLOCKMITPRATP") {
									return CalcStat("PartMitPRatP",L,N);
								} else {
									return 0;
								}
							} else if (SN > "PARTBLOCKMITPRATPA") {
								if (SN > "PARTBLOCKMITPRATPB") {
									if (SN == "PARTBLOCKMITPRATPC") {
										return CalcStat("PartMitPRatPC",L);
									} else {
										return 0;
									}
								} else if (SN == "PARTBLOCKMITPRATPB") {
									return CalcStat("PartMitPRatPB",L);
								} else {
									return 0;
								}
							} else {
								return CalcStat("PartMitPRatPA",L);
							}
						} else if (SN > "PARTBLOCKMITPRATPCAP") {
							if (SN < "PARTBLOCKPPRAT") {
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
							} else if (SN > "PARTBLOCKPPRAT") {
								if (SN > "PARTBLOCKPRATP") {
									if (SN == "PARTBLOCKPRATPA") {
										return CalcStat("PartBPEPRatPA",L);
									} else {
										return 0;
									}
								} else if (SN == "PARTBLOCKPRATP") {
									return CalcStat("PartBPEPRatP",L,N);
								} else {
									return 0;
								}
							} else {
								return CalcStat("PartBPEPPRat",L,N);
							}
						} else {
							return CalcStat("PartMitPRatPCap",L);
						}
					} else if (SN > "PARTBLOCKPRATPB") {
						if (SN < "PARTBPEPRATP") {
							if (SN < "PARTBLOCKPRATPCAPR") {
								if (SN > "PARTBLOCKPRATPC") {
									if (SN == "PARTBLOCKPRATPCAP") {
										return CalcStat("PartBPEPRatPCap",L);
									} else {
										return 0;
									}
								} else if (SN == "PARTBLOCKPRATPC") {
									return CalcStat("PartBPEPRatPC",L);
								} else {
									return 0;
								}
							} else if (SN > "PARTBLOCKPRATPCAPR") {
								if (SN > "PARTBPEPBONUS") {
									if (SN == "PARTBPEPPRAT") {
										return CalcRatAB(CalcStat("PartBPEPRatPA",L),CalcStat("PartBPEPRatPB",L),CalcStat("PartBPEPRatPCapR",L),N);
									} else {
										return 0;
									}
								} else if (SN == "PARTBPEPBONUS") {
									return 0;
								} else {
									return 0;
								}
							} else {
								return CalcStat("PartBPEPRatPCapR",L);
							}
						} else if (SN > "PARTBPEPRATP") {
							if (SN < "PARTBPEPRATPC") {
								if (SN > "PARTBPEPRATPA") {
									if (SN == "PARTBPEPRATPB") {
										if (L-DblCalcDev <= 130) {
											return CalcStat("BratProgAlt",L,CalcStat("ProgBPartial",L));
										} else {
											return CalcStat("BratProgAlt",L,CalcStat("ProgBPartialNew",L));
										}
									} else {
										return 0;
									}
								} else if (SN == "PARTBPEPRATPA") {
									if (L-DblCalcDev <= 130) {
										return 70;
									} else {
										return 75;
									}
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
									if (L-DblCalcDev <= 130) {
										return 35;
									} else {
										return 25;
									}
								} else {
									return 0;
								}
							} else {
								if (L-DblCalcDev <= 130) {
									return 1;
								} else {
									return 0.5;
								}
							}
						} else {
							return CalcPercAB(CalcStat("PartBPEPRatPA",L),CalcStat("PartBPEPRatPB",L),CalcStat("PartBPEPRatPCap",L),N);
						}
					} else {
						return CalcStat("PartBPEPRatPB",L);
					}
				} else {
					return CalcStat("PartMitPPRat",L,N);
				}
			} else {
				if (L-DblCalcDev <= 130) {
					return 400;
				} else {
					return 600;
				}
			}
		} else {
			if (L-DblCalcDev <= 130) {
				return 1;
			} else {
				return 0.5;
			}
		}
	} else if (SN > "PARTEVADEMITPBONUS") {
		if (SN < "PROGBMITMEDIUM") {
			if (SN < "PHYDMGPRATPB") {
				if (SN < "PARTMITPRATPCAP") {
					if (SN < "PARTEVADEPRATPA") {
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
					} else if (SN > "PARTEVADEPRATPA") {
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
							if (SN < "PARTMITPRATPA") {
								if (SN > "PARTMITPPRAT") {
									if (SN == "PARTMITPRATP") {
										return CalcPercAB(CalcStat("PartMitPRatPA",L),CalcStat("PartMitPRatPB",L),CalcStat("PartMitPRatPCap",L),N);
									} else {
										return 0;
									}
								} else if (SN == "PARTMITPPRAT") {
									return CalcRatAB(CalcStat("PartMitPRatPA",L),CalcStat("PartMitPRatPB",L),CalcStat("PartMitPRatPCapR",L),N);
								} else {
									return 0;
								}
							} else if (SN > "PARTMITPRATPA") {
								if (SN > "PARTMITPRATPB") {
									if (SN == "PARTMITPRATPC") {
										if (L-DblCalcDev <= 130) {
											return 1;
										} else {
											return 0.5;
										}
									} else {
										return 0;
									}
								} else if (SN == "PARTMITPRATPB") {
									if (L-DblCalcDev <= 130) {
										return CalcStat("BratProgAlt",L,CalcStat("ProgBPartial",L));
									} else {
										return CalcStat("BratProgAlt",L,CalcStat("ProgBPartialNew",L));
									}
								} else {
									return 0;
								}
							} else {
								if (L-DblCalcDev <= 130) {
									return 100;
								} else {
									return 105;
								}
							}
						} else {
							return 0.1;
						}
					} else {
						return CalcStat("PartBPEPRatPA",L);
					}
				} else if (SN > "PARTMITPRATPCAP") {
					if (SN < "PARTPARRYPPRAT") {
						if (SN < "PARTPARRYMITPRATPA") {
							if (SN < "PARTPARRYMITPBONUS") {
								if (SN == "PARTMITPRATPCAPR") {
									return CalcStat("PartMitPRatPB",L)*CalcStat("PartMitPRatPC",L);
								} else {
									return 0;
								}
							} else if (SN > "PARTPARRYMITPBONUS") {
								if (SN > "PARTPARRYMITPPRAT") {
									if (SN == "PARTPARRYMITPRATP") {
										return CalcStat("PartMitPRatP",L,N);
									} else {
										return 0;
									}
								} else if (SN == "PARTPARRYMITPPRAT") {
									return CalcStat("PartMitPPRat",L,N);
								} else {
									return 0;
								}
							} else {
								return CalcStat("PartMitPBonus",L);
							}
						} else if (SN > "PARTPARRYMITPRATPA") {
							if (SN < "PARTPARRYMITPRATPCAP") {
								if (SN > "PARTPARRYMITPRATPB") {
									if (SN == "PARTPARRYMITPRATPC") {
										return CalcStat("PartMitPRatPC",L);
									} else {
										return 0;
									}
								} else if (SN == "PARTPARRYMITPRATPB") {
									return CalcStat("PartMitPRatPB",L);
								} else {
									return 0;
								}
							} else if (SN > "PARTPARRYMITPRATPCAP") {
								if (SN > "PARTPARRYMITPRATPCAPR") {
									if (SN == "PARTPARRYPBONUS") {
										return CalcStat("PartBPEPBonus",L);
									} else {
										return 0;
									}
								} else if (SN == "PARTPARRYMITPRATPCAPR") {
									return CalcStat("PartMitPRatPCapR",L);
								} else {
									return 0;
								}
							} else {
								return CalcStat("PartMitPRatPCap",L);
							}
						} else {
							return CalcStat("PartMitPRatPA",L);
						}
					} else if (SN > "PARTPARRYPPRAT") {
						if (SN < "PARTPARRYPRATPCAP") {
							if (SN < "PARTPARRYPRATPA") {
								if (SN == "PARTPARRYPRATP") {
									return CalcStat("PartBPEPRatP",L,N);
								} else {
									return 0;
								}
							} else if (SN > "PARTPARRYPRATPA") {
								if (SN > "PARTPARRYPRATPB") {
									if (SN == "PARTPARRYPRATPC") {
										return CalcStat("PartBPEPRatPC",L);
									} else {
										return 0;
									}
								} else if (SN == "PARTPARRYPRATPB") {
									return CalcStat("PartBPEPRatPB",L);
								} else {
									return 0;
								}
							} else {
								return CalcStat("PartBPEPRatPA",L);
							}
						} else if (SN > "PARTPARRYPRATPCAP") {
							if (SN < "PHYDMGPPRAT") {
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
							} else if (SN > "PHYDMGPPRAT") {
								if (SN > "PHYDMGPRATP") {
									if (SN == "PHYDMGPRATPA") {
										return CalcStat("OutDmgPRatPA",L);
									} else {
										return 0;
									}
								} else if (SN == "PHYDMGPRATP") {
									return CalcStat("OutDmgPRatP",L,N);
								} else {
									return 0;
								}
							} else {
								return CalcStat("OutDmgPPRat",L,N);
							}
						} else {
							return CalcStat("PartBPEPRatPCap",L);
						}
					} else {
						return CalcStat("PartBPEPPRat",L,N);
					}
				} else {
					if (L-DblCalcDev <= 130) {
						return 50;
					} else {
						return 35;
					}
				}
			} else if (SN > "PHYDMGPRATPB") {
				if (SN < "PHYMITMPRATP") {
					if (SN < "PHYMITHPRATPCAPR") {
						if (SN < "PHYMITHPPRAT") {
							if (SN < "PHYDMGPRATPCAP") {
								if (SN == "PHYDMGPRATPC") {
									return CalcStat("OutDmgPRatPC",L);
								} else {
									return 0;
								}
							} else if (SN > "PHYDMGPRATPCAP") {
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
							} else {
								return CalcStat("OutDmgPRatPCap",L);
							}
						} else if (SN > "PHYMITHPPRAT") {
							if (SN < "PHYMITHPRATPB") {
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
							} else if (SN > "PHYMITHPRATPB") {
								if (SN > "PHYMITHPRATPC") {
									if (SN == "PHYMITHPRATPCAP") {
										return CalcStat("MitHeavyPRatPCap",L);
									} else {
										return 0;
									}
								} else if (SN == "PHYMITHPRATPC") {
									return CalcStat("MitHeavyPRatPC",L);
								} else {
									return 0;
								}
							} else {
								return CalcStat("MitHeavyPRatPB",L);
							}
						} else {
							return CalcStat("MitHeavyPPRat",L,N);
						}
					} else if (SN > "PHYMITHPRATPCAPR") {
						if (SN < "PHYMITLPRATPB") {
							if (SN < "PHYMITLPPRAT") {
								if (SN == "PHYMITLPBONUS") {
									return CalcStat("MitLightPBonus",L);
								} else {
									return 0;
								}
							} else if (SN > "PHYMITLPPRAT") {
								if (SN > "PHYMITLPRATP") {
									if (SN == "PHYMITLPRATPA") {
										return CalcStat("MitLightPRatPA",L);
									} else {
										return 0;
									}
								} else if (SN == "PHYMITLPRATP") {
									return CalcStat("MitLightPRatP",L,N);
								} else {
									return 0;
								}
							} else {
								return CalcStat("MitLightPPRat",L,N);
							}
						} else if (SN > "PHYMITLPRATPB") {
							if (SN < "PHYMITLPRATPCAPR") {
								if (SN > "PHYMITLPRATPC") {
									if (SN == "PHYMITLPRATPCAP") {
										return CalcStat("MitLightPRatPCap",L);
									} else {
										return 0;
									}
								} else if (SN == "PHYMITLPRATPC") {
									return CalcStat("MitLightPRatPC",L);
								} else {
									return 0;
								}
							} else if (SN > "PHYMITLPRATPCAPR") {
								if (SN > "PHYMITMPBONUS") {
									if (SN == "PHYMITMPPRAT") {
										return CalcStat("MitMediumPPRat",L,N);
									} else {
										return 0;
									}
								} else if (SN == "PHYMITMPBONUS") {
									return CalcStat("MitMediumPBonus",L);
								} else {
									return 0;
								}
							} else {
								return CalcStat("MitLightPRatPCapR",L);
							}
						} else {
							return CalcStat("MitLightPRatPB",L);
						}
					} else {
						return CalcStat("MitHeavyPRatPCapR",L);
					}
				} else if (SN > "PHYMITMPRATP") {
					if (SN < "PROGBHIGHNEW") {
						if (SN < "PHYMITMPRATPCAPR") {
							if (SN < "PHYMITMPRATPB") {
								if (SN == "PHYMITMPRATPA") {
									return CalcStat("MitMediumPRatPA",L);
								} else {
									return 0;
								}
							} else if (SN > "PHYMITMPRATPB") {
								if (SN > "PHYMITMPRATPC") {
									if (SN == "PHYMITMPRATPCAP") {
										return CalcStat("MitMediumPRatPCap",L);
									} else {
										return 0;
									}
								} else if (SN == "PHYMITMPRATPC") {
									return CalcStat("MitMediumPRatPC",L);
								} else {
									return 0;
								}
							} else {
								return CalcStat("MitMediumPRatPB",L);
							}
						} else if (SN > "PHYMITMPRATPCAPR") {
							if (SN < "PROGBDEFENCE") {
								if (SN > "PNTMPARMOUR") {
									if (SN == "PNTMPRATINGS") {
										return 14820/247000;
									} else {
										return 0;
									}
								} else if (SN == "PNTMPARMOUR") {
									return 24375/247000;
								} else {
									return 0;
								}
							} else if (SN > "PROGBDEFENCE") {
								if (SN > "PROGBDEFENCENEW") {
									if (SN == "PROGBHIGH") {
										return 500;
									} else {
										return 0;
									}
								} else if (SN == "PROGBDEFENCENEW") {
									return 532;
								} else {
									return 0;
								}
							} else {
								return 266;
							}
						} else {
							return CalcStat("MitMediumPRatPCapR",L);
						}
					} else if (SN > "PROGBHIGHNEW") {
						if (SN < "PROGBMEDIUMNEW") {
							if (SN < "PROGBMASTERY") {
								if (SN > "PROGBLOW") {
									if (SN == "PROGBLOWNEW") {
										return 400;
									} else {
										return 0;
									}
								} else if (SN == "PROGBLOW") {
									return 200;
								} else {
									return 0;
								}
							} else if (SN > "PROGBMASTERY") {
								if (SN > "PROGBMASTERYNEW") {
									if (SN == "PROGBMEDIUM") {
										return 400;
									} else {
										return 0;
									}
								} else if (SN == "PROGBMASTERYNEW") {
									return 540;
								} else {
									return 0;
								}
							} else {
								return 270;
							}
						} else if (SN > "PROGBMEDIUMNEW") {
							if (SN < "PROGBMITIGATION") {
								if (SN > "PROGBMITHEAVY") {
									if (SN == "PROGBMITHEAVYNEW") {
										return 401.6;
									} else {
										return 0;
									}
								} else if (SN == "PROGBMITHEAVY") {
									return 174;
								} else {
									return 0;
								}
							} else if (SN > "PROGBMITIGATION") {
								if (SN > "PROGBMITLIGHT") {
									if (SN == "PROGBMITLIGHTNEW") {
										return 800/3;
									} else {
										return 0;
									}
								} else if (SN == "PROGBMITLIGHT") {
									return 280/3;
								} else {
									return 0;
								}
							} else {
								return CalcStat("ProgBMitMedium",L);
							}
						} else {
							return 800;
						}
					} else {
						return 10000/6;
					}
				} else {
					return CalcStat("MitMediumPRatP",L,N);
				}
			} else {
				return CalcStat("OutDmgPRatPB",L);
			}
		} else if (SN > "PROGBMITMEDIUM") {
			if (SN < "TACDMGPRATPA") {
				if (SN < "STATPROGALTVPL") {
					if (SN < "RESISTPRATPC") {
						if (SN < "PROGEXTCOMLOWRAW") {
							if (SN < "PROGBPARTIAL") {
								if (SN == "PROGBMITMEDIUMNEW") {
									return 7040/21;
								} else {
									return 0;
								}
							} else if (SN > "PROGBPARTIAL") {
								if (SN > "PROGBPARTIALNEW") {
									if (SN == "PROGEXTCOMHIGHRAW") {
										if (L-DblCalcDev <= 121) {
											return ExpFmod(N,121,20,L);
										} else if (L-DblCalcDev <= 125) {
											return ExpFmod(CalcStat("ProgExtComHighRaw",121,N),122,5.5,L);
										} else if (L-DblCalcDev <= 126) {
											return ExpFmod(CalcStat("ProgExtComHighRaw",125,N),126,20,L);
										} else if (L-DblCalcDev <= 130) {
											return ExpFmod(CalcStat("ProgExtComHighRaw",126,N),127,5.5,L);
										} else if (L-DblCalcDev <= 131) {
											return ExpFmod(CalcStat("ProgExtComHighRaw",130,N),131,20,L);
										} else if (L-DblCalcDev <= 140) {
											return ExpFmod(CalcStat("ProgExtComHighRaw",131,N),132,5.5,L);
										} else {
											return CalcStat("ProgExtComHighRaw",140,N);
										}
									} else {
										return 0;
									}
								} else if (SN == "PROGBPARTIALNEW") {
									return 500;
								} else {
									return 0;
								}
							} else {
								return 350;
							}
						} else if (SN > "PROGEXTCOMLOWRAW") {
							if (SN < "RESISTPRATP") {
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
							} else if (SN > "RESISTPRATP") {
								if (SN > "RESISTPRATPA") {
									if (SN == "RESISTPRATPB") {
										if (L-DblCalcDev <= 130) {
											return CalcStat("BratProgAlt",L,CalcStat("ProgBLow",L));
										} else {
											return CalcStat("BratProgAlt",L,CalcStat("ProgBLowNew",L));
										}
									} else {
										return 0;
									}
								} else if (SN == "RESISTPRATPA") {
									if (L-DblCalcDev <= 130) {
										return 100;
									} else {
										return 150;
									}
								} else {
									return 0;
								}
							} else {
								return CalcPercAB(CalcStat("ResistPRatPA",L),CalcStat("ResistPRatPB",L),CalcStat("ResistPRatPCap",L),N);
							}
						} else {
							if (L-DblCalcDev <= 116) {
								return ExpFmod(N,116,20,L);
							} else if (L-DblCalcDev <= 120) {
								return ExpFmod(CalcStat("ProgExtComLowRaw",116,N),117,5.5,L);
							} else {
								return CalcStat("ProgExtComHighRaw",L,CalcStat("ProgExtComLowRaw",120,N));
							}
						}
					} else if (SN > "RESISTPRATPC") {
						if (SN < "RUNEKEEPERCDARMOURTYPE") {
							if (SN < "RESISTPRATPCAPR") {
								if (SN == "RESISTPRATPCAP") {
									return 50;
								} else {
									return 0;
								}
							} else if (SN > "RESISTPRATPCAPR") {
								if (SN > "RESISTT") {
									if (SN == "RESISTTADJ") {
										if (L-DblCalcDev <= 130) {
											return CalcStat("AdjTraitProgRatings",L);
										} else if (L-DblCalcDev <= 131) {
											return 11/9.0;
										} else {
											return 12/9.0;
										}
									} else {
										return 0;
									}
								} else if (SN == "RESISTT") {
									return LinFmod(1,LotroDbl(CalcStat("PntMPRatings",L)*CalcStat("TraitProgAltVPL",L,CalcStat("ProgBLow",L))*CalcStat("ResistTAdj",CalcStat("TraitProgAltLPL",L))*N),LotroDbl(CalcStat("PntMPRatings",L)*CalcStat("TraitProgAltVPH",L,CalcStat("ProgBLow",L))*CalcStat("ResistTAdj",CalcStat("TraitProgAltLPH",L))*N),CalcStat("TraitProgAltLPL",L),CalcStat("TraitProgAltLPH",L),L);
								} else {
									return 0;
								}
							} else {
								return CalcStat("ResistPRatPB",L)*CalcStat("ResistPRatPC",L);
							}
						} else if (SN > "RUNEKEEPERCDARMOURTYPE") {
							if (SN < "STATPROGALTLPH") {
								if (SN > "STATPROG") {
									if (SN == "STATPROGALT") {
										if (L-DblCalcDev <= 75) {
											return LinFmod(RoundDbl(N),1,75,1,75,L);
										} else if (L-DblCalcDev <= 76) {
											return LinFmod(1,RoundDbl(N)*75,CalcStat("StdProgAlt",76,N),75,76,L);
										} else {
											return CalcStat("StdProgAlt",L,N);
										}
									} else {
										return 0;
									}
								} else if (SN == "STATPROG") {
									if (L-DblCalcDev <= 75) {
										return LinFmod(RoundDbl(N),1,75,1,75,L);
									} else if (L-DblCalcDev <= 76) {
										return LinFmod(1,RoundDbl(N)*75,CalcStat("StdProg",76,N),75,76,L);
									} else {
										return CalcStat("StdProg",L,N);
									}
								} else {
									return 0;
								}
							} else if (SN > "STATPROGALTLPH") {
								if (SN > "STATPROGALTLPL") {
									if (SN == "STATPROGALTVPH") {
										return CalcStat("StatProgAlt",CalcStat("StatProgAltLPH",L),N);
									} else {
										return 0;
									}
								} else if (SN == "STATPROGALTLPL") {
									return CalcStat("StdProgAltLPL",L);
								} else {
									return 0;
								}
							} else {
								return CalcStat("StdProgAltLPH",L);
							}
						} else {
							return 1;
						}
					} else {
						if (L-DblCalcDev <= 130) {
							return 1;
						} else {
							return 0.5;
						}
					}
				} else if (SN > "STATPROGALTVPL") {
					if (SN < "STDPROGLPH") {
						if (SN < "STDPROG") {
							if (SN < "STATPROGLPL") {
								if (SN == "STATPROGLPH") {
									return CalcStat("StdProgLPH",L);
								} else {
									return 0;
								}
							} else if (SN > "STATPROGLPL") {
								if (SN > "STATPROGVPH") {
									if (SN == "STATPROGVPL") {
										return CalcStat("StatProg",CalcStat("StatProgLPL",L),N);
									} else {
										return 0;
									}
								} else if (SN == "STATPROGVPH") {
									return CalcStat("StatProg",CalcStat("StatProgLPH",L),N);
								} else {
									return 0;
								}
							} else {
								return CalcStat("StdProgLPL",L);
							}
						} else if (SN > "STDPROG") {
							if (SN < "STDPROGALTLPL") {
								if (SN > "STDPROGALT") {
									if (SN == "STDPROGALTLPH") {
										return CalcStat("StdProgLPH",L);
									} else {
										return 0;
									}
								} else if (SN == "STDPROGALT") {
									if (L-DblCalcDev <= 130) {
										return CalcStat("StdProg",L,N);
									} else if (L-DblCalcDev <= 131) {
										return LinFmod(N,3150,3117.5,130,131,L);
									} else if (L-DblCalcDev <= 140) {
										return LinFmod(N,3117.5,6235,131,140,L);
									} else if (L-DblCalcDev <= 141) {
										return LinFmod(N,6235,7482,140,141,L);
									} else {
										return LinFmod(N,7482,12470,141,150,L);
									}
								} else {
									return 0;
								}
							} else if (SN > "STDPROGALTLPL") {
								if (SN > "STDPROGALTVPH") {
									if (SN == "STDPROGALTVPL") {
										return CalcStat("StdProgAlt",CalcStat("StdProgAltLPL",L),N);
									} else {
										return 0;
									}
								} else if (SN == "STDPROGALTVPH") {
									return CalcStat("StdProgAlt",CalcStat("StdProgAltLPH",L),N);
								} else {
									return 0;
								}
							} else {
								return CalcStat("StdProgLPL",L);
							}
						} else {
							if (L-DblCalcDev <= 75) {
								return LinFmod(N,1,75,1,75,L);
							} else if (L-DblCalcDev <= 76) {
								return LinFmod(1,N*75,RoundDbl(N*82.5,-2),75,76,L);
							} else if (L-DblCalcDev <= 100) {
								return LinFmod(1,RoundDbl(N*82.5,-2),N*150,76,100,L);
							} else if (L-DblCalcDev <= 101) {
								return LinFmod(N,150,165,100,101,L);
							} else if (L-DblCalcDev <= 105) {
								return LinFmod(N,165,225,101,105,L);
							} else if (L-DblCalcDev <= 106) {
								return LinFmod(N,225,270,105,106,L);
							} else if (L-DblCalcDev <= 115) {
								return LinFmod(N,270,450,106,115,L);
							} else if (L-DblCalcDev <= 116) {
								return LinFmod(N,450,495,115,116,L);
							} else if (L-DblCalcDev <= 120) {
								return LinFmod(N,495,1125,116,120,L);
							} else if (L-DblCalcDev <= 121) {
								return LinFmod(N,1125,1575,120,121,L);
							} else if (L-DblCalcDev <= 130) {
								return LinFmod(N,1575,3150,121,130,L);
							} else if (L-DblCalcDev <= 131) {
								return LinFmod(N,3150,3118.5,130,131,L);
							} else if (L-DblCalcDev <= 140) {
								return LinFmod(N,3118.5,6237,131,140,L);
							} else if (L-DblCalcDev <= 141) {
								return LinFmod(N,6237,7484.4,140,141,L);
							} else {
								return LinFmod(N,7484.4,12474,141,150,L);
							}
						}
					} else if (SN > "STDPROGLPH") {
						if (SN < "T2PENBPE") {
							if (SN < "STDPROGVPH") {
								if (SN == "STDPROGLPL") {
									if (L-DblCalcDev <= 75) {
										return 1;
									} else if (L-DblCalcDev <= 76) {
										return 75;
									} else if (L-DblCalcDev <= 100) {
										return 76;
									} else if (L-DblCalcDev <= 101) {
										return 100;
									} else if (L-DblCalcDev <= 105) {
										return 101;
									} else if (L-DblCalcDev <= 106) {
										return 105;
									} else if (L-DblCalcDev <= 115) {
										return 106;
									} else if (L-DblCalcDev <= 116) {
										return 115;
									} else if (L-DblCalcDev <= 120) {
										return 116;
									} else if (L-DblCalcDev <= 121) {
										return 120;
									} else if (L-DblCalcDev <= 130) {
										return 121;
									} else if (L-DblCalcDev <= 131) {
										return 130;
									} else if (L-DblCalcDev <= 140) {
										return 131;
									} else if (L-DblCalcDev <= 141) {
										return 140;
									} else {
										return 141;
									}
								} else {
									return 0;
								}
							} else if (SN > "STDPROGVPH") {
								if (SN > "STDPROGVPL") {
									if (SN == "T2PENARMOUR") {
										return CalcStat("T2penMit",L);
									} else {
										return 0;
									}
								} else if (SN == "STDPROGVPL") {
									return CalcStat("StdProg",CalcStat("StdProgLPL",L),N);
								} else {
									return 0;
								}
							} else {
								return CalcStat("StdProg",CalcStat("StdProgLPH",L),N);
							}
						} else if (SN > "T2PENBPE") {
							if (SN < "TACDMGPBONUS") {
								if (SN > "T2PENMIT") {
									if (SN == "T2PENRESIST") {
										if (L-DblCalcDev <= 115) {
											return (-90)*L;
										} else {
											return CalcStat("ProgExtComLowRaw",L,CalcStat("T2PenResist",115));
										}
									} else {
										return 0;
									}
								} else if (SN == "T2PENMIT") {
									if (L-DblCalcDev <= 115) {
										return FloorDbl(L*13.5)*-5;
									} else {
										return CalcStat("ProgExtComLowRaw",L,CalcStat("T2PenMit",115));
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
						} else {
							if (L-DblCalcDev <= 115) {
								return (-40)*L;
							} else {
								return CalcStat("ProgExtComLowRaw",L,CalcStat("T2PenBPE",115));
							}
						}
					} else {
						if (L-DblCalcDev <= 75) {
							return 75;
						} else if (L-DblCalcDev <= 76) {
							return 76;
						} else if (L-DblCalcDev <= 100) {
							return 100;
						} else if (L-DblCalcDev <= 101) {
							return 101;
						} else if (L-DblCalcDev <= 105) {
							return 105;
						} else if (L-DblCalcDev <= 106) {
							return 106;
						} else if (L-DblCalcDev <= 115) {
							return 115;
						} else if (L-DblCalcDev <= 116) {
							return 116;
						} else if (L-DblCalcDev <= 120) {
							return 120;
						} else if (L-DblCalcDev <= 121) {
							return 121;
						} else if (L-DblCalcDev <= 130) {
							return 130;
						} else if (L-DblCalcDev <= 131) {
							return 131;
						} else if (L-DblCalcDev <= 140) {
							return 140;
						} else if (L-DblCalcDev <= 141) {
							return 141;
						} else {
							return 150;
						}
					}
				} else {
					return CalcStat("StatProgAlt",CalcStat("StatProgAltLPL",L),N);
				}
			} else if (SN > "TACDMGPRATPA") {
				if (SN < "TACMITMPPRAT") {
					if (SN < "TACMITHPRATPCAP") {
						if (SN < "TACMITHPBONUS") {
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
						} else if (SN > "TACMITHPBONUS") {
							if (SN < "TACMITHPRATPA") {
								if (SN > "TACMITHPPRAT") {
									if (SN == "TACMITHPRATP") {
										return CalcStat("MitHeavyPRatP",L,N);
									} else {
										return 0;
									}
								} else if (SN == "TACMITHPPRAT") {
									return CalcStat("MitHeavyPPRat",L,N);
								} else {
									return 0;
								}
							} else if (SN > "TACMITHPRATPA") {
								if (SN > "TACMITHPRATPB") {
									if (SN == "TACMITHPRATPC") {
										return CalcStat("MitHeavyPRatPC",L);
									} else {
										return 0;
									}
								} else if (SN == "TACMITHPRATPB") {
									return CalcStat("MitHeavyPRatPB",L);
								} else {
									return 0;
								}
							} else {
								return CalcStat("MitHeavyPRatPA",L);
							}
						} else {
							return CalcStat("MitHeavyPBonus",L);
						}
					} else if (SN > "TACMITHPRATPCAP") {
						if (SN < "TACMITLPRATPA") {
							if (SN < "TACMITLPBONUS") {
								if (SN == "TACMITHPRATPCAPR") {
									return CalcStat("MitHeavyPRatPCapR",L);
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
						} else if (SN > "TACMITLPRATPA") {
							if (SN < "TACMITLPRATPCAP") {
								if (SN > "TACMITLPRATPB") {
									if (SN == "TACMITLPRATPC") {
										return CalcStat("MitLightPRatPC",L);
									} else {
										return 0;
									}
								} else if (SN == "TACMITLPRATPB") {
									return CalcStat("MitLightPRatPB",L);
								} else {
									return 0;
								}
							} else if (SN > "TACMITLPRATPCAP") {
								if (SN > "TACMITLPRATPCAPR") {
									if (SN == "TACMITMPBONUS") {
										return CalcStat("MitMediumPBonus",L);
									} else {
										return 0;
									}
								} else if (SN == "TACMITLPRATPCAPR") {
									return CalcStat("MitLightPRatPCapR",L);
								} else {
									return 0;
								}
							} else {
								return CalcStat("MitLightPRatPCap",L);
							}
						} else {
							return CalcStat("MitLightPRatPA",L);
						}
					} else {
						return CalcStat("MitHeavyPRatPCap",L);
					}
				} else if (SN > "TACMITMPPRAT") {
					if (SN < "TRAITPROG") {
						if (SN < "TACMITMPRATPCAP") {
							if (SN < "TACMITMPRATPA") {
								if (SN == "TACMITMPRATP") {
									return CalcStat("MitMediumPRatP",L,N);
								} else {
									return 0;
								}
							} else if (SN > "TACMITMPRATPA") {
								if (SN > "TACMITMPRATPB") {
									if (SN == "TACMITMPRATPC") {
										return CalcStat("MitMediumPRatPC",L);
									} else {
										return 0;
									}
								} else if (SN == "TACMITMPRATPB") {
									return CalcStat("MitMediumPRatPB",L);
								} else {
									return 0;
								}
							} else {
								return CalcStat("MitMediumPRatPA",L);
							}
						} else if (SN > "TACMITMPRATPCAP") {
							if (SN < "TPENBPE") {
								if (SN > "TACMITMPRATPCAPR") {
									if (SN == "TPENARMOUR") {
										return -CalcStat("ArmourT",L,CalcStat("TpenChoice",N)*2);
									} else {
										return 0;
									}
								} else if (SN == "TACMITMPRATPCAPR") {
									return CalcStat("MitMediumPRatPCapR",L);
								} else {
									return 0;
								}
							} else if (SN > "TPENBPE") {
								if (SN > "TPENCHOICE") {
									if (SN == "TPENRESIST") {
										return -CalcStat("ResistT",L,CalcStat("TpenChoice",N)*2);
									} else {
										return 0;
									}
								} else if (SN == "TPENCHOICE") {
									return DataTableValue([0,1,2],L);
								} else {
									return 0;
								}
							} else {
								return -CalcStat("BPET",L,CalcStat("TpenChoice",N));
							}
						} else {
							return CalcStat("MitMediumPRatPCap",L);
						}
					} else if (SN > "TRAITPROG") {
						if (SN < "TRAITPROGLPH") {
							if (SN < "TRAITPROGALTLPL") {
								if (SN > "TRAITPROGALT") {
									if (SN == "TRAITPROGALTLPH") {
										if (L-DblCalcDev <= 105) {
											return 105;
										} else {
											return CalcStat("StatProgAltLPH",L);
										}
									} else {
										return 0;
									}
								} else if (SN == "TRAITPROGALT") {
									if (L-DblCalcDev <= 105) {
										return LinFmod(1,CalcStat("StatProgAlt",1,N),CalcStat("StatProgAlt",105,N),1,105,L);
									} else {
										return CalcStat("StatProgAlt",L,N);
									}
								} else {
									return 0;
								}
							} else if (SN > "TRAITPROGALTLPL") {
								if (SN > "TRAITPROGALTVPH") {
									if (SN == "TRAITPROGALTVPL") {
										return CalcStat("TraitProgAlt",CalcStat("TraitProgAltLPL",L),N);
									} else {
										return 0;
									}
								} else if (SN == "TRAITPROGALTVPH") {
									return CalcStat("TraitProgAlt",CalcStat("TraitProgAltLPH",L),N);
								} else {
									return 0;
								}
							} else {
								if (L-DblCalcDev <= 105) {
									return 1;
								} else {
									return CalcStat("StatProgAltLPL",L);
								}
							}
						} else if (SN > "TRAITPROGLPH") {
							if (SN < "TRAITPROGVPL") {
								if (SN > "TRAITPROGLPL") {
									if (SN == "TRAITPROGVPH") {
										return CalcStat("TraitProg",CalcStat("TraitProgLPH",L),N);
									} else {
										return 0;
									}
								} else if (SN == "TRAITPROGLPL") {
									if (L-DblCalcDev <= 105) {
										return 1;
									} else {
										return CalcStat("StatProgLPL",L);
									}
								} else {
									return 0;
								}
							} else if (SN > "TRAITPROGVPL") {
								if (SN > "WARDENCDARMOURTYPE") {
									if (SN == "WARDENCDCANBLOCK") {
										return 1;
									} else {
										return 0;
									}
								} else if (SN == "WARDENCDARMOURTYPE") {
									return 2;
								} else {
									return 0;
								}
							} else {
								return CalcStat("TraitProg",CalcStat("TraitProgLPL",L),N);
							}
						} else {
							if (L-DblCalcDev <= 105) {
								return 105;
							} else {
								return CalcStat("StatProgLPH",L);
							}
						}
					} else {
						if (L-DblCalcDev <= 105) {
							return LinFmod(1,CalcStat("StatProg",1,N),CalcStat("StatProg",105,N),1,105,L);
						} else {
							return CalcStat("StatProg",L,N);
						}
					}
				} else {
					return CalcStat("MitMediumPPRat",L,N);
				}
			} else {
				return CalcStat("OutDmgPRatPA",L);
			}
		} else {
			return 382/3;
		}
	} else {
		return CalcStat("PartMitPBonus",L);
	}
}

// Support functions for CalcStat. These consist of implementations of more complex calculation types, decode methods for parameter "C" and rounding/min/max/compare functions for floating point numbers.

// ****************** Calculation Type support functions ******************

// DDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDD
// DataTableValue: Takes a value from an array table.

function DataTableValue(vDataArray, lIndex)
{
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
			var dDec = ((-DblCalcDev <= vDec && vDec <= DblCalcDev) ? 1 : Math.pow(10,vDec));
			dFac = dFac*dDec;
			dAdd = dAdd*dDec+0.5+DblCalcDev;
			var dL = dLstart-DblCalcDev;
			while (dL++ <= dLvl)
				dResult = Math.floor(dResult*dFac+dAdd)/dDec;
			return dResult;
		}
	}
}

// PPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPP
// CalcPercAB: Calculates the percentage out of a rating based on the AB formula.

function CalcPercAB(dA, dB, dPCap, dR)
{
	if (dR <= DblCalcDev)
		return 0;
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
		return 0;
	else {
		var dResult = dB/(dA/dP-1);
		return ((dResult >= dCapR-DblCalcDev) ? dCapR : dResult);
	}
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
	else if (typeof vDec === "undefined")
		return dVal*(dFstart*(dLend-dLvl)+(dLvl-dLstart)*dFend)/(dLend-dLstart);
	else if (-DblCalcDev <= vDec && vDec <= DblCalcDev)
		return Math.floor(dVal*(dFstart*(dLend-dLvl)+(dLvl-dLstart)*dFend)/(dLend-dLstart)+0.5+DblCalcDev);
	else
		return Math.floor((dVal*(dFstart*(dLend-dLvl)+(dLvl-dLstart)*dFend)/(dLend-dLstart))*Math.pow(10,vDec)+0.5+DblCalcDev)/Math.pow(10,vDec);
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
		var minlvl = 1;
		var maxlvl = 500;
		var devlvl = 3;
	
		var left = minlvl-1;
		var right = maxlvl;
		var middle = 0;
		
		var count = minlvl;

		while (right > left+1 && count++ <= maxlvl) {
			middle = Math.floor((left+right)/2+DblCalcDev);
			if (CalcStat(sStat,middle)+DblCalcDev >= dNum)
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
			if  (dNum-DblCalcDev <= dFound && dFound <= dNum+DblCalcDev)
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
	if (typeof vDec === "undefined")
		return Math.floor(dNum+0.5+DblCalcDev);
	else
		return ((-DblCalcDev <= vDec && vDec <= DblCalcDev) ? Math.floor(dNum+0.5+DblCalcDev) : Math.floor(dNum*Math.pow(10,vDec)+0.5+DblCalcDev)/Math.pow(10,vDec));
}

function FloorDbl(dNum, vDec)
{
	if (typeof vDec === "undefined")
		return Math.floor(dNum+DblCalcDev);
	else
		return ((-DblCalcDev <= vDec && vDec <= DblCalcDev) ? Math.floor(dNum+DblCalcDev) : Math.floor(dNum*Math.pow(10,vDec)+DblCalcDev)/Math.pow(10,vDec));
}

function CeilDbl(dNum, vDec)
{
	if (typeof vDec === "undefined")
		return Math.ceil(dNum-DblCalcDev);
	else
		return ((-DblCalcDev <= vDec && vDec <= DblCalcDev) ? Math.ceil(dNum-DblCalcDev) : Math.ceil(dNum*Math.pow(10,vDec)-DblCalcDev)/Math.pow(10,vDec));
}

function LotroDbl(dNum)
{
	var dNumCeiled = CeilDbl(dNum,0);

	if (-DblCalcDev <= dNumCeiled && dNumCeiled <= DblCalcDev)
		return 0;
	else {
		var dLen;
		if (dNumCeiled > DblCalcDev)
			dLen = Math.floor(Math.log10(dNumCeiled)+DblCalcDev)+1;
		else
			dLen = Math.floor(Math.log10(-dNumCeiled)+DblCalcDev)+1;
		var dDec = 3-dLen;
		if (dDec < -DblCalcDev)
			return CeilDbl(dNum,dDec);
		else
			return dNumCeiled;
	}
}
