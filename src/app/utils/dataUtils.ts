export const reduceArrayLenth = (arr: any[], desiredLength: number): any[] => {
    while (arr.length > desiredLength) {
        arr = arr.filter((_, index) => index % 2 === 0);
    }
    return arr;
}

export const _sampleData = [
    {
        "timestamp": 1703376000,
        "value_usd": 1826.515213639454
    },
    {
        "timestamp": 1703377800,
        "value_usd": 1827.9954683201395
    },
    {
        "timestamp": 1703379600,
        "value_usd": 1839.344585720387
    },
    {
        "timestamp": 1703381400,
        "value_usd": 1834.6668948004426
    },
    {
        "timestamp": 1703383200,
        "value_usd": 1849.7055161941275
    },
    {
        "timestamp": 1703385000,
        "value_usd": 1842.7599815524295
    },
    {
        "timestamp": 1703386800,
        "value_usd": 1841.0306893434272
    },
    {
        "timestamp": 1703388600,
        "value_usd": 1842.3875960369005
    },
    {
        "timestamp": 1703390400,
        "value_usd": 1844.082153483429
    },
    {
        "timestamp": 1703392200,
        "value_usd": 1839.5571572431809
    },
    {
        "timestamp": 1703394000,
        "value_usd": 1839.4036363803402
    },
    {
        "timestamp": 1703395800,
        "value_usd": 1821.1921097325267
    },
    {
        "timestamp": 1703397600,
        "value_usd": 1824.3917315338472
    },
    {
        "timestamp": 1703399400,
        "value_usd": 1831.4225815088166
    },
    {
        "timestamp": 1703401200,
        "value_usd": 1837.7651408812485
    },
    {
        "timestamp": 1703403000,
        "value_usd": 1835.633492626676
    },
    {
        "timestamp": 1703404800,
        "value_usd": 1828.036819683497
    },
    {
        "timestamp": 1703406600,
        "value_usd": 1833.1903655576207
    },
    {
        "timestamp": 1703408400,
        "value_usd": 1838.5551502196076
    },
    {
        "timestamp": 1703410200,
        "value_usd": 1841.0777880851592
    },
    {
        "timestamp": 1703412000,
        "value_usd": 1834.5350925064722
    },
    {
        "timestamp": 1703413800,
        "value_usd": 1833.059816764077
    },
    {
        "timestamp": 1703415600,
        "value_usd": 1842.081007924602
    },
    {
        "timestamp": 1703417400,
        "value_usd": 1840.8215236103274
    },
    {
        "timestamp": 1703419200,
        "value_usd": 1838.0888203541103
    },
    {
        "timestamp": 1703421000,
        "value_usd": 1844.6993322079811
    },
    {
        "timestamp": 1703422800,
        "value_usd": 1847.6682285572156
    },
    {
        "timestamp": 1703424600,
        "value_usd": 1850.3244786698142
    },
    {
        "timestamp": 1703426400,
        "value_usd": 1855.7895903645422
    },
    {
        "timestamp": 1703428200,
        "value_usd": 1840.6113155745902
    },
    {
        "timestamp": 1703430000,
        "value_usd": 1848.6836043664794
    },
    {
        "timestamp": 1703431800,
        "value_usd": 1845.6841179529947
    },
    {
        "timestamp": 1703433600,
        "value_usd": 1844.779649823793
    },
    {
        "timestamp": 1703435400,
        "value_usd": 1847.7243767460209
    },
    {
        "timestamp": 1703437200,
        "value_usd": 1846.3067895503586
    },
    {
        "timestamp": 1703439000,
        "value_usd": 1846.9550998214868
    },
    {
        "timestamp": 1703440800,
        "value_usd": 1848.823517408293
    },
    {
        "timestamp": 1703442600,
        "value_usd": 1848.3050359689169
    },
    {
        "timestamp": 1703444400,
        "value_usd": 1853.5470567504585
    },
    {
        "timestamp": 1703446200,
        "value_usd": 1848.6991264855023
    },
    {
        "timestamp": 1703448000,
        "value_usd": 1847.1476638299705
    },
    {
        "timestamp": 1703449800,
        "value_usd": 1832.8195457334718
    },
    {
        "timestamp": 1703451600,
        "value_usd": 1835.942113728478
    },
    {
        "timestamp": 1703453400,
        "value_usd": 1829.8872645779752
    },
    {
        "timestamp": 1703455200,
        "value_usd": 1804.2965222296457
    },
    {
        "timestamp": 1703457000,
        "value_usd": 1802.2985934755952
    },
    {
        "timestamp": 1703458800,
        "value_usd": 1809.3585244743476
    },
    {
        "timestamp": 1703460600,
        "value_usd": 1806.344299499186
    },
    {
        "timestamp": 1703462400,
        "value_usd": 1800.182942297295
    },
    {
        "timestamp": 1703464200,
        "value_usd": 1800.0396358232188
    },
    {
        "timestamp": 1703466000,
        "value_usd": 1806.5297873793743
    },
    {
        "timestamp": 1703467800,
        "value_usd": 1808.36799415225
    },
    {
        "timestamp": 1703469600,
        "value_usd": 1803.7062517419658
    },
    {
        "timestamp": 1703471400,
        "value_usd": 1810.6881159397958
    },
    {
        "timestamp": 1703473200,
        "value_usd": 1814.6465875806234
    },
    {
        "timestamp": 1703475000,
        "value_usd": 1820.1871180513417
    },
    {
        "timestamp": 1703476800,
        "value_usd": 1831.1537735718375
    },
    {
        "timestamp": 1703478600,
        "value_usd": 1831.5492272698775
    },
    {
        "timestamp": 1703480400,
        "value_usd": 1832.4849021763298
    },
    {
        "timestamp": 1703482200,
        "value_usd": 1838.3869990329222
    },
    {
        "timestamp": 1703484000,
        "value_usd": 1845.1941011742933
    },
    {
        "timestamp": 1703485800,
        "value_usd": 1838.1666859347647
    },
    {
        "timestamp": 1703487600,
        "value_usd": 1832.1270147908622
    },
    {
        "timestamp": 1703489400,
        "value_usd": 1830.9169634771079
    },
    {
        "timestamp": 1703491200,
        "value_usd": 1838.5063159897654
    },
    {
        "timestamp": 1703493000,
        "value_usd": 1822.1531084931999
    },
    {
        "timestamp": 1703494800,
        "value_usd": 1814.8641437571364
    },
    {
        "timestamp": 1703496600,
        "value_usd": 1812.9817619752826
    },
    {
        "timestamp": 1703498400,
        "value_usd": 1813.0036295727086
    },
    {
        "timestamp": 1703500200,
        "value_usd": 1808.8572762108665
    },
    {
        "timestamp": 1703502000,
        "value_usd": 1805.7830483631055
    },
    {
        "timestamp": 1703503800,
        "value_usd": 1806.5306356195624
    },
    {
        "timestamp": 1703505600,
        "value_usd": 1803.4241971723068
    },
    {
        "timestamp": 1703507400,
        "value_usd": 1821.0176746359207
    },
    {
        "timestamp": 1703509200,
        "value_usd": 1814.7742945717491
    },
    {
        "timestamp": 1703511000,
        "value_usd": 1818.9399494961108
    },
    {
        "timestamp": 1703512800,
        "value_usd": 1822.9459442219463
    },
    {
        "timestamp": 1703514600,
        "value_usd": 1831.5458682627423
    },
    {
        "timestamp": 1703516400,
        "value_usd": 1834.4733059653472
    },
    {
        "timestamp": 1703518200,
        "value_usd": 1831.7764038579908
    },
    {
        "timestamp": 1703520000,
        "value_usd": 1829.5890953406597
    },
    {
        "timestamp": 1703521800,
        "value_usd": 1816.339955304716
    },
    {
        "timestamp": 1703523600,
        "value_usd": 1823.552883049686
    },
    {
        "timestamp": 1703525400,
        "value_usd": 1821.6988921521397
    },
    {
        "timestamp": 1703527200,
        "value_usd": 1822.8853504660797
    },
    {
        "timestamp": 1703529000,
        "value_usd": 1819.0893419272911
    },
    {
        "timestamp": 1703530800,
        "value_usd": 1818.7359315617218
    },
    {
        "timestamp": 1703532600,
        "value_usd": 1820.2981073853648
    },
    {
        "timestamp": 1703534400,
        "value_usd": 1810.9164514859726
    },
    {
        "timestamp": 1703536200,
        "value_usd": 1811.8095798918825
    },
    {
        "timestamp": 1703538000,
        "value_usd": 1813.2325569256259
    },
    {
        "timestamp": 1703539800,
        "value_usd": 1818.8180117366105
    },
    {
        "timestamp": 1703541600,
        "value_usd": 1833.507597722879
    },
    {
        "timestamp": 1703543400,
        "value_usd": 1842.4207949518445
    },
    {
        "timestamp": 1703545200,
        "value_usd": 1840.8836113971693
    },
    {
        "timestamp": 1703547000,
        "value_usd": 1838.9272465557838
    },
    {
        "timestamp": 1703548800,
        "value_usd": 1836.573058767417
    },
    {
        "timestamp": 1703550600,
        "value_usd": 1832.058228900009
    },
    {
        "timestamp": 1703552400,
        "value_usd": 1836.5783314683845
    },
    {
        "timestamp": 1703554200,
        "value_usd": 1834.8217046878754
    },
    {
        "timestamp": 1703556000,
        "value_usd": 1839.300159971423
    },
    {
        "timestamp": 1703557800,
        "value_usd": 1837.9991440379486
    },
    {
        "timestamp": 1703559600,
        "value_usd": 1849.9786068198305
    },
    {
        "timestamp": 1703561400,
        "value_usd": 1845.4630495766073
    },
    {
        "timestamp": 1703563200,
        "value_usd": 1846.9108809466184
    },
    {
        "timestamp": 1703565000,
        "value_usd": 1844.8507211653018
    },
    {
        "timestamp": 1703566800,
        "value_usd": 1821.8847270223887
    },
    {
        "timestamp": 1703568600,
        "value_usd": 1798.2721022559836
    },
    {
        "timestamp": 1703570400,
        "value_usd": 1791.121763175985
    },
    {
        "timestamp": 1703572200,
        "value_usd": 1789.5768969420405
    },
    {
        "timestamp": 1703574000,
        "value_usd": 1797.172978371284
    },
    {
        "timestamp": 1703575800,
        "value_usd": 1800.480500602593
    },
    {
        "timestamp": 1703577600,
        "value_usd": 1795.8766638385382
    },
    {
        "timestamp": 1703579400,
        "value_usd": 1797.1065308741595
    },
    {
        "timestamp": 1703581200,
        "value_usd": 1796.9212335026045
    },
    {
        "timestamp": 1703583000,
        "value_usd": 1784.8141114683258
    },
    {
        "timestamp": 1703584800,
        "value_usd": 1798.5192473474485
    },
    {
        "timestamp": 1703586600,
        "value_usd": 1803.2096871613448
    },
    {
        "timestamp": 1703588400,
        "value_usd": 1803.580736970246
    },
    {
        "timestamp": 1703590200,
        "value_usd": 1808.4836528844817
    },
    {
        "timestamp": 1703592000,
        "value_usd": 1812.9279903770384
    },
    {
        "timestamp": 1703593800,
        "value_usd": 1834.6784906547782
    },
    {
        "timestamp": 1703595600,
        "value_usd": 1837.4534535425337
    },
    {
        "timestamp": 1703597400,
        "value_usd": 1845.6069141868993
    },
    {
        "timestamp": 1703599200,
        "value_usd": 1835.7507334215893
    },
    {
        "timestamp": 1703601000,
        "value_usd": 1825.3312026183917
    },
    {
        "timestamp": 1703602800,
        "value_usd": 1825.3888178434981
    },
    {
        "timestamp": 1703604600,
        "value_usd": 1811.347232378218
    },
    {
        "timestamp": 1703606400,
        "value_usd": 1804.1602064520603
    },
    {
        "timestamp": 1703608200,
        "value_usd": 1806.6294807755544
    },
    {
        "timestamp": 1703610000,
        "value_usd": 1792.9769310521388
    },
    {
        "timestamp": 1703611800,
        "value_usd": 1764.5101976985275
    },
    {
        "timestamp": 1703613600,
        "value_usd": 1764.179694329313
    },
    {
        "timestamp": 1703615400,
        "value_usd": 1772.8653214814144
    },
    {
        "timestamp": 1703617200,
        "value_usd": 1780.3376691945364
    },
    {
        "timestamp": 1703619000,
        "value_usd": 1778.034050175942
    },
    {
        "timestamp": 1703620800,
        "value_usd": 1785.5224091714504
    },
    {
        "timestamp": 1703622600,
        "value_usd": 1790.605646568502
    },
    {
        "timestamp": 1703624400,
        "value_usd": 1794.5082817569428
    },
    {
        "timestamp": 1703626200,
        "value_usd": 1795.0470580131791
    },
    {
        "timestamp": 1703628000,
        "value_usd": 1797.5275981116988
    },
    {
        "timestamp": 1703629800,
        "value_usd": 1797.0106005210869
    },
    {
        "timestamp": 1703631600,
        "value_usd": 1797.0346941460334
    },
    {
        "timestamp": 1703633400,
        "value_usd": 1800.0086659732137
    },
    {
        "timestamp": 1703635200,
        "value_usd": 1795.9490931771375
    },
    {
        "timestamp": 1703637000,
        "value_usd": 1788.6542053407443
    },
    {
        "timestamp": 1703638800,
        "value_usd": 1783.8910118455046
    },
    {
        "timestamp": 1703640600,
        "value_usd": 1790.67878819094
    },
    {
        "timestamp": 1703642400,
        "value_usd": 1779.689251240235
    },
    {
        "timestamp": 1703644200,
        "value_usd": 1768.7274990361752
    },
    {
        "timestamp": 1703646000,
        "value_usd": 1765.1750167182086
    },
    {
        "timestamp": 1703647800,
        "value_usd": 1765.2009019498755
    },
    {
        "timestamp": 1703649600,
        "value_usd": 1771.0985139832264
    },
    {
        "timestamp": 1703651400,
        "value_usd": 1771.6998793540452
    },
    {
        "timestamp": 1703653200,
        "value_usd": 1770.4253807191408
    },
    {
        "timestamp": 1703655000,
        "value_usd": 1775.7469819213898
    },
    {
        "timestamp": 1703656800,
        "value_usd": 1776.0711399868464
    },
    {
        "timestamp": 1703658600,
        "value_usd": 1781.8573570398612
    },
    {
        "timestamp": 1703660400,
        "value_usd": 1781.2199864018598
    },
    {
        "timestamp": 1703662200,
        "value_usd": 1785.450339322243
    },
    {
        "timestamp": 1703664000,
        "value_usd": 1792.901375613963
    },
    {
        "timestamp": 1703665800,
        "value_usd": 1811.1088648631444
    },
    {
        "timestamp": 1703667600,
        "value_usd": 1820.7345581397558
    },
    {
        "timestamp": 1703669400,
        "value_usd": 1828.1988223151711
    },
    {
        "timestamp": 1703671200,
        "value_usd": 1843.7673201190855
    },
    {
        "timestamp": 1703673000,
        "value_usd": 1849.3261714104792
    },
    {
        "timestamp": 1703674800,
        "value_usd": 1845.5035046523212
    },
    {
        "timestamp": 1703676600,
        "value_usd": 1848.1424013724495
    },
    {
        "timestamp": 1703678400,
        "value_usd": 1857.7721174086041
    },
    {
        "timestamp": 1703680200,
        "value_usd": 1857.6522819165448
    },
    {
        "timestamp": 1703682000,
        "value_usd": 1865.3024516916198
    },
    {
        "timestamp": 1703683800,
        "value_usd": 1865.2070780831555
    },
    {
        "timestamp": 1703685600,
        "value_usd": 1870.4644040957292
    },
    {
        "timestamp": 1703687400,
        "value_usd": 1894.4717535255445
    },
    {
        "timestamp": 1703689200,
        "value_usd": 1911.597079261524
    },
    {
        "timestamp": 1703691000,
        "value_usd": 1914.8030665595138
    },
    {
        "timestamp": 1703692800,
        "value_usd": 1949.1823559376503
    },
    {
        "timestamp": 1703694600,
        "value_usd": 1949.0096277724774
    },
    {
        "timestamp": 1703696400,
        "value_usd": 1925.4046089838894
    },
    {
        "timestamp": 1703698200,
        "value_usd": 1915.9917446972195
    },
    {
        "timestamp": 1703700000,
        "value_usd": 1913.6282281886006
    },
    {
        "timestamp": 1703701800,
        "value_usd": 1922.002539503043
    },
    {
        "timestamp": 1703703600,
        "value_usd": 1925.9522548321684
    },
    {
        "timestamp": 1703705400,
        "value_usd": 1923.394455446417
    },
    {
        "timestamp": 1703707200,
        "value_usd": 1928.1566948397685
    },
    {
        "timestamp": 1703709000,
        "value_usd": 1930.8282986159702
    },
    {
        "timestamp": 1703710800,
        "value_usd": 1933.481202245564
    },
    {
        "timestamp": 1703712600,
        "value_usd": 1938.0630284222334
    },
    {
        "timestamp": 1703714400,
        "value_usd": 1943.35268425916
    },
    {
        "timestamp": 1703716200,
        "value_usd": 1948.644082643812
    },
    {
        "timestamp": 1703718000,
        "value_usd": 1952.4927541098946
    },
    {
        "timestamp": 1703719800,
        "value_usd": 1960.963299513061
    },
    {
        "timestamp": 1703721600,
        "value_usd": 1993.4157151123577
    },
    {
        "timestamp": 1703723400,
        "value_usd": 2050.875805202937
    },
    {
        "timestamp": 1703725200,
        "value_usd": 2043.2788775958215
    },
    {
        "timestamp": 1703727000,
        "value_usd": 2061.263127924622
    },
    {
        "timestamp": 1703728800,
        "value_usd": 2049.9389831312656
    },
    {
        "timestamp": 1703730600,
        "value_usd": 2056.350561989339
    },
    {
        "timestamp": 1703732400,
        "value_usd": 2051.745045490032
    },
    {
        "timestamp": 1703734200,
        "value_usd": 2070.6535561218743
    },
    {
        "timestamp": 1703736000,
        "value_usd": 2085.0727492503256
    },
    {
        "timestamp": 1703737800,
        "value_usd": 2062.4094195199846
    },
    {
        "timestamp": 1703739600,
        "value_usd": 2045.8744606935788
    },
    {
        "timestamp": 1703741400,
        "value_usd": 2066.9066634701203
    },
    {
        "timestamp": 1703743200,
        "value_usd": 2034.9241067176645
    },
    {
        "timestamp": 1703745000,
        "value_usd": 2023.6565234953005
    },
    {
        "timestamp": 1703746800,
        "value_usd": 2011.4677170975451
    },
    {
        "timestamp": 1703748600,
        "value_usd": 2013.9679425656327
    },
    {
        "timestamp": 1703750400,
        "value_usd": 2030.7281912775265
    },
    {
        "timestamp": 1703752200,
        "value_usd": 2019.5012639259598
    },
    {
        "timestamp": 1703754000,
        "value_usd": 2024.672821326334
    },
    {
        "timestamp": 1703755800,
        "value_usd": 2015.972180511565
    },
    {
        "timestamp": 1703757600,
        "value_usd": 2024.6600564358205
    },
    {
        "timestamp": 1703759400,
        "value_usd": 2030.6713968089493
    },
    {
        "timestamp": 1703761200,
        "value_usd": 2023.5093715988128
    },
    {
        "timestamp": 1703763000,
        "value_usd": 2037.8491361084662
    },
    {
        "timestamp": 1703764800,
        "value_usd": 2005.2527773039533
    },
    {
        "timestamp": 1703766600,
        "value_usd": 1978.917686666835
    },
    {
        "timestamp": 1703768400,
        "value_usd": 2003.487256175687
    },
    {
        "timestamp": 1703770200,
        "value_usd": 1993.2591203951924
    },
    {
        "timestamp": 1703772000,
        "value_usd": 1967.5307386251316
    },
    {
        "timestamp": 1703773800,
        "value_usd": 1947.0737405227524
    },
    {
        "timestamp": 1703775600,
        "value_usd": 1936.0802720111055
    },
    {
        "timestamp": 1703777400,
        "value_usd": 1936.7597897524201
    },
    {
        "timestamp": 1703779200,
        "value_usd": 1938.9291239608128
    },
    {
        "timestamp": 1703781000,
        "value_usd": 1950.3100546976839
    },
    {
        "timestamp": 1703782800,
        "value_usd": 1959.3040097163048
    },
    {
        "timestamp": 1703784600,
        "value_usd": 1949.5242893357035
    },
    {
        "timestamp": 1703786400,
        "value_usd": 1952.2115480013485
    },
    {
        "timestamp": 1703788200,
        "value_usd": 1953.3775073684114
    },
    {
        "timestamp": 1703790000,
        "value_usd": 1963.7432441551864
    },
    {
        "timestamp": 1703791800,
        "value_usd": 1971.3281840002778
    },
    {
        "timestamp": 1703793600,
        "value_usd": 1962.9623422185655
    },
    {
        "timestamp": 1703795400,
        "value_usd": 1966.3508901653277
    },
    {
        "timestamp": 1703797200,
        "value_usd": 1972.5850482091278
    },
    {
        "timestamp": 1703799000,
        "value_usd": 1947.1155219802818
    },
    {
        "timestamp": 1703800800,
        "value_usd": 1952.1586175120533
    },
    {
        "timestamp": 1703802600,
        "value_usd": 1965.698891073062
    },
    {
        "timestamp": 1703804400,
        "value_usd": 1957.908656618271
    },
    {
        "timestamp": 1703806200,
        "value_usd": 1950.7567575524831
    },
    {
        "timestamp": 1703808000,
        "value_usd": 1943.1455342809613
    },
    {
        "timestamp": 1703809800,
        "value_usd": 1917.7964638419921
    },
    {
        "timestamp": 1703811600,
        "value_usd": 1898.9651466318646
    },
    {
        "timestamp": 1703813400,
        "value_usd": 1900.4211832119072
    },
    {
        "timestamp": 1703815200,
        "value_usd": 1898.6390770411726
    },
    {
        "timestamp": 1703817000,
        "value_usd": 1913.5018460388842
    },
    {
        "timestamp": 1703818800,
        "value_usd": 1917.6089918723114
    },
    {
        "timestamp": 1703820600,
        "value_usd": 1922.3967079851013
    },
    {
        "timestamp": 1703822400,
        "value_usd": 1922.5101801257351
    },
    {
        "timestamp": 1703824200,
        "value_usd": 1928.1607302841726
    },
    {
        "timestamp": 1703826000,
        "value_usd": 1919.829775960015
    },
    {
        "timestamp": 1703827800,
        "value_usd": 1924.5568836372631
    },
    {
        "timestamp": 1703829600,
        "value_usd": 1923.6411518125728
    },
    {
        "timestamp": 1703831400,
        "value_usd": 1917.8050805374332
    },
    {
        "timestamp": 1703833200,
        "value_usd": 1919.0565273264938
    },
    {
        "timestamp": 1703835000,
        "value_usd": 1888.9718174337581
    },
    {
        "timestamp": 1703836800,
        "value_usd": 1894.504959876545
    },
    {
        "timestamp": 1703838600,
        "value_usd": 1906.0480424319244
    },
    {
        "timestamp": 1703840400,
        "value_usd": 1917.9733422929357
    },
    {
        "timestamp": 1703842200,
        "value_usd": 1929.31554786463
    },
    {
        "timestamp": 1703844000,
        "value_usd": 1928.3098429083948
    },
    {
        "timestamp": 1703845800,
        "value_usd": 1930.0657651993547
    },
    {
        "timestamp": 1703847600,
        "value_usd": 1934.97514318397
    },
    {
        "timestamp": 1703849400,
        "value_usd": 1935.0429504169529
    },
    {
        "timestamp": 1703851200,
        "value_usd": 1931.007648960821
    },
    {
        "timestamp": 1703853000,
        "value_usd": 1929.117409401255
    },
    {
        "timestamp": 1703854800,
        "value_usd": 1915.447050342565
    },
    {
        "timestamp": 1703856600,
        "value_usd": 1923.698406386873
    },
    {
        "timestamp": 1703858400,
        "value_usd": 1925.0202769781608
    },
    {
        "timestamp": 1703860200,
        "value_usd": 1944.6978819915366
    },
    {
        "timestamp": 1703862000,
        "value_usd": 1916.332411137494
    },
    {
        "timestamp": 1703863800,
        "value_usd": 1885.7835992420592
    },
    {
        "timestamp": 1703865600,
        "value_usd": 1876.7587538641928
    },
    {
        "timestamp": 1703867400,
        "value_usd": 1857.6836904853099
    },
    {
        "timestamp": 1703869200,
        "value_usd": 1856.4775835990604
    },
    {
        "timestamp": 1703871000,
        "value_usd": 1859.8243060633863
    },
    {
        "timestamp": 1703872800,
        "value_usd": 1867.0878970061476
    },
    {
        "timestamp": 1703874600,
        "value_usd": 1880.2981171919778
    },
    {
        "timestamp": 1703876400,
        "value_usd": 1882.0902229696353
    },
    {
        "timestamp": 1703878200,
        "value_usd": 1884.7474639436846
    },
    {
        "timestamp": 1703880000,
        "value_usd": 1876.7431401982744
    },
    {
        "timestamp": 1703881800,
        "value_usd": 1878.0668807504885
    },
    {
        "timestamp": 1703883600,
        "value_usd": 1876.3249151292803
    },
    {
        "timestamp": 1703885400,
        "value_usd": 1865.3165670358835
    },
    {
        "timestamp": 1703887200,
        "value_usd": 1857.9342504884175
    },
    {
        "timestamp": 1703889000,
        "value_usd": 1863.2661862452715
    },
    {
        "timestamp": 1703890800,
        "value_usd": 1872.0840518317873
    },
    {
        "timestamp": 1703892600,
        "value_usd": 1880.4797937980375
    },
    {
        "timestamp": 1703894400,
        "value_usd": 1881.591208437701
    },
    {
        "timestamp": 1703896200,
        "value_usd": 1883.2296965165888
    },
    {
        "timestamp": 1703898000,
        "value_usd": 1890.5998826091222
    },
    {
        "timestamp": 1703899800,
        "value_usd": 1889.278414936838
    },
    {
        "timestamp": 1703901600,
        "value_usd": 1886.1097878489682
    },
    {
        "timestamp": 1703903400,
        "value_usd": 1867.805161194769
    },
    {
        "timestamp": 1703905200,
        "value_usd": 1865.7279960898009
    },
    {
        "timestamp": 1703907000,
        "value_usd": 1875.6954621879036
    },
    {
        "timestamp": 1703908800,
        "value_usd": 1877.2511446636627
    },
    {
        "timestamp": 1703910600,
        "value_usd": 1881.9053767563373
    },
    {
        "timestamp": 1703912400,
        "value_usd": 1889.662741577365
    },
    {
        "timestamp": 1703914200,
        "value_usd": 1895.7093831619322
    },
    {
        "timestamp": 1703916000,
        "value_usd": 1889.4030349573968
    },
    {
        "timestamp": 1703917800,
        "value_usd": 1895.51576188823
    },
    {
        "timestamp": 1703919600,
        "value_usd": 1893.437679518226
    },
    {
        "timestamp": 1703921400,
        "value_usd": 1881.365502463546
    },
    {
        "timestamp": 1703923200,
        "value_usd": 1872.2114889356121
    },
    {
        "timestamp": 1703925000,
        "value_usd": 1860.4022390633727
    },
    {
        "timestamp": 1703926800,
        "value_usd": 1864.7467378311503
    },
    {
        "timestamp": 1703928600,
        "value_usd": 1863.3873783477006
    },
    {
        "timestamp": 1703930400,
        "value_usd": 1868.956397236398
    },
    {
        "timestamp": 1703932200,
        "value_usd": 1866.46469625918
    },
    {
        "timestamp": 1703934000,
        "value_usd": 1867.2633606226232
    },
    {
        "timestamp": 1703935800,
        "value_usd": 1865.301447614023
    },
    {
        "timestamp": 1703937600,
        "value_usd": 1869.0269996625807
    },
    {
        "timestamp": 1703939400,
        "value_usd": 1861.0826076731446
    },
    {
        "timestamp": 1703941200,
        "value_usd": 1854.4941724031391
    },
    {
        "timestamp": 1703943000,
        "value_usd": 1859.7884299227994
    },
    {
        "timestamp": 1703944800,
        "value_usd": 1859.0277117786682
    },
    {
        "timestamp": 1703946600,
        "value_usd": 1866.5932562048747
    },
    {
        "timestamp": 1703948400,
        "value_usd": 1865.8895806058777
    },
    {
        "timestamp": 1703950200,
        "value_usd": 1876.8251360357767
    },
    {
        "timestamp": 1703952000,
        "value_usd": 1882.0696797129308
    },
    {
        "timestamp": 1703953800,
        "value_usd": 1878.5275761593743
    },
    {
        "timestamp": 1703955600,
        "value_usd": 1877.870716345371
    },
    {
        "timestamp": 1703957400,
        "value_usd": 1870.9378281598238
    },
    {
        "timestamp": 1703959200,
        "value_usd": 1867.9375315819634
    },
    {
        "timestamp": 1703961000,
        "value_usd": 1868.5296325039753
    },
    {
        "timestamp": 1703962800,
        "value_usd": 1867.8591819660005
    },
    {
        "timestamp": 1703964600,
        "value_usd": 1865.5495132398669
    },
    {
        "timestamp": 1703966400,
        "value_usd": 1871.0076475825908
    },
    {
        "timestamp": 1703968200,
        "value_usd": 1866.750102177596
    },
    {
        "timestamp": 1703970000,
        "value_usd": 1866.2378859876098
    },
    {
        "timestamp": 1703971800,
        "value_usd": 1863.36872927898
    },
    {
        "timestamp": 1703973600,
        "value_usd": 1861.3577008336488
    },
    {
        "timestamp": 1703975400,
        "value_usd": 1853.4855317396286
    },
    {
        "timestamp": 1703977200,
        "value_usd": 1861.6358994249595
    },
    {
        "timestamp": 1703979000,
        "value_usd": 1856.3754715053624
    },
    {
        "timestamp": 1703980800,
        "value_usd": 1860.5121278800343
    },
    {
        "timestamp": 1703982600,
        "value_usd": 1874.7892629437192
    },
    {
        "timestamp": 1703984400,
        "value_usd": 1872.7648806305301
    },
    {
        "timestamp": 1703986200,
        "value_usd": 1871.7982127774421
    },
    {
        "timestamp": 1703988000,
        "value_usd": 1872.4479370589966
    },
    {
        "timestamp": 1703989800,
        "value_usd": 1861.1900180063335
    },
    {
        "timestamp": 1703991600,
        "value_usd": 1855.9632244503255
    },
    {
        "timestamp": 1703993400,
        "value_usd": 1858.4336829439203
    },
    {
        "timestamp": 1703995200,
        "value_usd": 1860.7752172166288
    },
    {
        "timestamp": 1703997000,
        "value_usd": 1852.076968878142
    },
    {
        "timestamp": 1703998800,
        "value_usd": 1851.421088478423
    },
    {
        "timestamp": 1704000600,
        "value_usd": 1853.2092854583962
    },
    {
        "timestamp": 1704002400,
        "value_usd": 1865.6458263503187
    }
]