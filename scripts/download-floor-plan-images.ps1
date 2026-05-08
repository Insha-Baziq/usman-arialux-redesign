$ErrorActionPreference = 'Continue'

$base = 'C:\Users\baziq\OneDrive\Documents\Freelance\Usman Studio\my-clone\public\images\floor-plans'

# Logo URL fragment to skip
$logoFragment = 'ARIALUX%20HOMES%20LOGO'

# Scraped data: slug -> array of image URLs
$plans = @{
    'aria-heights' = @(
        'https://img1.wsimg.com/isteam/ip/3260288d-1180-4f25-980c-7e6bbf1754ec/phonto-2026e06.jpeg'
        'https://img1.wsimg.com/isteam/ip/3260288d-1180-4f25-980c-7e6bbf1754ec/IMG_5368.jpeg'
        'https://img1.wsimg.com/isteam/ip/3260288d-1180-4f25-980c-7e6bbf1754ec/IMG_5363.jpeg'
        'https://img1.wsimg.com/isteam/ip/3260288d-1180-4f25-980c-7e6bbf1754ec/IMG_5366.jpeg'
        'https://img1.wsimg.com/isteam/ip/3260288d-1180-4f25-980c-7e6bbf1754ec/IMG_5365.jpeg'
        'https://img1.wsimg.com/isteam/ip/3260288d-1180-4f25-980c-7e6bbf1754ec/IMG_5364.jpeg'
    )
    'amberstone' = @(
        'https://img1.wsimg.com/isteam/ip/3260288d-1180-4f25-980c-7e6bbf1754ec/phonto-6c8cc83.jpeg'
        'https://img1.wsimg.com/isteam/ip/3260288d-1180-4f25-980c-7e6bbf1754ec/IMG_5373.jpeg'
        'https://img1.wsimg.com/isteam/ip/3260288d-1180-4f25-980c-7e6bbf1754ec/IMG_5374.jpeg'
        'https://img1.wsimg.com/isteam/ip/3260288d-1180-4f25-980c-7e6bbf1754ec/IMG_5372.jpeg'
        'https://img1.wsimg.com/isteam/ip/3260288d-1180-4f25-980c-7e6bbf1754ec/IMG_3727.jpeg'
        'https://img1.wsimg.com/isteam/ip/3260288d-1180-4f25-980c-7e6bbf1754ec/IMG_9151-7a2eb99.jpeg'
        'https://img1.wsimg.com/isteam/ip/3260288d-1180-4f25-980c-7e6bbf1754ec/phonto-2ecd45c.jpeg'
        'https://img1.wsimg.com/isteam/ip/3260288d-1180-4f25-980c-7e6bbf1754ec/IMG_9172.jpeg'
        'https://img1.wsimg.com/isteam/ip/3260288d-1180-4f25-980c-7e6bbf1754ec/IMG_2386.jpeg'
        'https://img1.wsimg.com/isteam/ip/3260288d-1180-4f25-980c-7e6bbf1754ec/IMG_1261.jpeg'
        'https://img1.wsimg.com/isteam/ip/3260288d-1180-4f25-980c-7e6bbf1754ec/IMG_8030.jpeg'
        'https://img1.wsimg.com/isteam/ip/3260288d-1180-4f25-980c-7e6bbf1754ec/IMG_8028.jpeg'
        'https://img1.wsimg.com/isteam/ip/3260288d-1180-4f25-980c-7e6bbf1754ec/IMG_8031.jpeg'
        'https://img1.wsimg.com/isteam/ip/3260288d-1180-4f25-980c-7e6bbf1754ec/IMG_8029.jpeg'
        'https://img1.wsimg.com/isteam/ip/3260288d-1180-4f25-980c-7e6bbf1754ec/IMG_8040.jpeg'
        'https://img1.wsimg.com/isteam/ip/3260288d-1180-4f25-980c-7e6bbf1754ec/IMG_8039.jpeg'
        'https://img1.wsimg.com/isteam/ip/3260288d-1180-4f25-980c-7e6bbf1754ec/IMG_5010.jpeg'
        'https://img1.wsimg.com/isteam/ip/3260288d-1180-4f25-980c-7e6bbf1754ec/IMG_5013.jpeg'
        'https://img1.wsimg.com/isteam/ip/3260288d-1180-4f25-980c-7e6bbf1754ec/IMG_5009.jpeg'
        'https://img1.wsimg.com/isteam/ip/3260288d-1180-4f25-980c-7e6bbf1754ec/IMG_5011.jpeg'
        'https://img1.wsimg.com/isteam/ip/3260288d-1180-4f25-980c-7e6bbf1754ec/IMG_5012.jpeg'
        'https://img1.wsimg.com/isteam/ip/3260288d-1180-4f25-980c-7e6bbf1754ec/IMG_3833.jpeg'
        'https://img1.wsimg.com/isteam/ip/3260288d-1180-4f25-980c-7e6bbf1754ec/IMG_0435.jpeg'
        'https://img1.wsimg.com/isteam/ip/3260288d-1180-4f25-980c-7e6bbf1754ec/IMG_3800.jpeg'
        'https://img1.wsimg.com/isteam/ip/3260288d-1180-4f25-980c-7e6bbf1754ec/IMG_9146.jpeg'
        'https://img1.wsimg.com/isteam/ip/3260288d-1180-4f25-980c-7e6bbf1754ec/IMG_9148.jpeg'
        'https://img1.wsimg.com/isteam/ip/3260288d-1180-4f25-980c-7e6bbf1754ec/IMG_9147.jpeg'
        'https://img1.wsimg.com/isteam/ip/3260288d-1180-4f25-980c-7e6bbf1754ec/IMG_9149.jpeg'
        'https://img1.wsimg.com/isteam/ip/3260288d-1180-4f25-980c-7e6bbf1754ec/IMG_9609.jpeg'
        'https://img1.wsimg.com/isteam/ip/3260288d-1180-4f25-980c-7e6bbf1754ec/IMG_9152.jpeg'
        'https://img1.wsimg.com/isteam/ip/3260288d-1180-4f25-980c-7e6bbf1754ec/IMG_9151.jpeg'
        'https://img1.wsimg.com/isteam/ip/3260288d-1180-4f25-980c-7e6bbf1754ec/phonto-8dd9736.jpeg'
        'https://img1.wsimg.com/isteam/ip/3260288d-1180-4f25-980c-7e6bbf1754ec/phonto-39704c9.jpeg'
        'https://img1.wsimg.com/isteam/ip/3260288d-1180-4f25-980c-7e6bbf1754ec/IMG_5022.jpeg'
        'https://img1.wsimg.com/isteam/ip/3260288d-1180-4f25-980c-7e6bbf1754ec/IMG_5021.jpeg'
        'https://img1.wsimg.com/isteam/ip/3260288d-1180-4f25-980c-7e6bbf1754ec/IMG_5027.jpeg'
        'https://img1.wsimg.com/isteam/ip/3260288d-1180-4f25-980c-7e6bbf1754ec/IMG_4525.jpeg'
        'https://img1.wsimg.com/isteam/ip/3260288d-1180-4f25-980c-7e6bbf1754ec/IMG_4404.jpeg'
        'https://img1.wsimg.com/isteam/ip/3260288d-1180-4f25-980c-7e6bbf1754ec/IMG_4524.jpeg'
        'https://img1.wsimg.com/isteam/ip/3260288d-1180-4f25-980c-7e6bbf1754ec/IMG_4403.jpeg'
        'https://img1.wsimg.com/isteam/ip/3260288d-1180-4f25-980c-7e6bbf1754ec/IMG_4982.jpeg'
        'https://img1.wsimg.com/isteam/ip/3260288d-1180-4f25-980c-7e6bbf1754ec/IMG_3782.jpeg'
    )
    'bellastone' = @(
        'https://img1.wsimg.com/isteam/ip/3260288d-1180-4f25-980c-7e6bbf1754ec/a85e3301-11d5-466c-8126-40a8ef7ea5fd-52d2355.jpeg'
        'https://img1.wsimg.com/isteam/ip/3260288d-1180-4f25-980c-7e6bbf1754ec/IMG_8866-b4e6c2c.jpeg'
        'https://img1.wsimg.com/isteam/ip/3260288d-1180-4f25-980c-7e6bbf1754ec/IMG_3098.jpeg'
        'https://img1.wsimg.com/isteam/ip/3260288d-1180-4f25-980c-7e6bbf1754ec/IMG_8299.jpeg'
        'https://img1.wsimg.com/isteam/ip/3260288d-1180-4f25-980c-7e6bbf1754ec/IMG_2573.jpeg'
        'https://img1.wsimg.com/isteam/ip/3260288d-1180-4f25-980c-7e6bbf1754ec/IMG_3163.jpeg'
    )
    'casa-luna' = @(
        'https://img1.wsimg.com/isteam/ip/3260288d-1180-4f25-980c-7e6bbf1754ec/phonto-0187e95.jpeg'
        'https://img1.wsimg.com/isteam/ip/3260288d-1180-4f25-980c-7e6bbf1754ec/IMG_3750.jpeg'
        'https://img1.wsimg.com/isteam/ip/3260288d-1180-4f25-980c-7e6bbf1754ec/IMG_3751.jpeg'
    )
    'casa-ria' = @(
        'https://img1.wsimg.com/isteam/ip/3260288d-1180-4f25-980c-7e6bbf1754ec/phonto-1125770.jpeg'
        'https://img1.wsimg.com/isteam/ip/3260288d-1180-4f25-980c-7e6bbf1754ec/phonto-3d0d79c.jpeg'
        'https://img1.wsimg.com/isteam/ip/3260288d-1180-4f25-980c-7e6bbf1754ec/phonto-c804687.jpeg'
        'https://img1.wsimg.com/isteam/ip/3260288d-1180-4f25-980c-7e6bbf1754ec/phonto-414e11b.jpeg'
        'https://img1.wsimg.com/isteam/ip/3260288d-1180-4f25-980c-7e6bbf1754ec/IMG_5347.jpeg'
    )
    'casa-inaya' = @(
        'https://img1.wsimg.com/isteam/ip/3260288d-1180-4f25-980c-7e6bbf1754ec/phonto-32ce93e.jpeg'
        'https://img1.wsimg.com/isteam/ip/3260288d-1180-4f25-980c-7e6bbf1754ec/IMG_5252.jpeg'
        'https://img1.wsimg.com/isteam/ip/3260288d-1180-4f25-980c-7e6bbf1754ec/phonto-5e38221.jpeg'
        'https://img1.wsimg.com/isteam/ip/3260288d-1180-4f25-980c-7e6bbf1754ec/IMG_5249.jpeg'
        'https://img1.wsimg.com/isteam/ip/3260288d-1180-4f25-980c-7e6bbf1754ec/IMG_5251.jpeg'
    )
    'sierra-heights' = @(
        'https://img1.wsimg.com/isteam/ip/3260288d-1180-4f25-980c-7e6bbf1754ec/phonto-5d39bb6.jpeg'
        'https://img1.wsimg.com/isteam/ip/3260288d-1180-4f25-980c-7e6bbf1754ec/phonto-c7cce57.jpeg'
        'https://img1.wsimg.com/isteam/ip/3260288d-1180-4f25-980c-7e6bbf1754ec/IMG_5385.jpeg'
        'https://img1.wsimg.com/isteam/ip/3260288d-1180-4f25-980c-7e6bbf1754ec/IMG_5171.jpeg'
        'https://img1.wsimg.com/isteam/ip/3260288d-1180-4f25-980c-7e6bbf1754ec/IMG_5387.jpeg'
        'https://img1.wsimg.com/isteam/ip/3260288d-1180-4f25-980c-7e6bbf1754ec/IMG_5386.jpeg'
    )
    'villa-terra' = @(
        'https://img1.wsimg.com/isteam/ip/3260288d-1180-4f25-980c-7e6bbf1754ec/5a60ec6b-f757-4730-ad48-3258bab2c01e.jpeg'
        'https://img1.wsimg.com/isteam/ip/3260288d-1180-4f25-980c-7e6bbf1754ec/IMG_2307-2dbb050.jpeg'
        'https://img1.wsimg.com/isteam/ip/3260288d-1180-4f25-980c-7e6bbf1754ec/IMG_2310-13a5ecb.jpeg'
        'https://img1.wsimg.com/isteam/ip/3260288d-1180-4f25-980c-7e6bbf1754ec/IMG_2308.jpeg'
        'https://img1.wsimg.com/isteam/ip/3260288d-1180-4f25-980c-7e6bbf1754ec/IMG_2309-1307cf2.jpeg'
        'https://img1.wsimg.com/isteam/ip/3260288d-1180-4f25-980c-7e6bbf1754ec/IMG_2189.jpeg'
        'https://img1.wsimg.com/isteam/ip/3260288d-1180-4f25-980c-7e6bbf1754ec/IMG_2194.jpeg'
        'https://img1.wsimg.com/isteam/ip/3260288d-1180-4f25-980c-7e6bbf1754ec/IMG_2184.jpeg'
        'https://img1.wsimg.com/isteam/ip/3260288d-1180-4f25-980c-7e6bbf1754ec/IMG_2180.jpeg'
        'https://img1.wsimg.com/isteam/ip/3260288d-1180-4f25-980c-7e6bbf1754ec/IMG_2198.jpeg'
        'https://img1.wsimg.com/isteam/ip/3260288d-1180-4f25-980c-7e6bbf1754ec/IMG_2200.jpeg'
        'https://img1.wsimg.com/isteam/ip/3260288d-1180-4f25-980c-7e6bbf1754ec/acb756af-5cea-4379-b9ed-8739cfa76428.jpeg'
        'https://img1.wsimg.com/isteam/ip/3260288d-1180-4f25-980c-7e6bbf1754ec/64f7fa0a-51cc-4c69-9b61-a7604022a7cc.jpeg'
        'https://img1.wsimg.com/isteam/ip/3260288d-1180-4f25-980c-7e6bbf1754ec/IMG_2559.jpeg'
        'https://img1.wsimg.com/isteam/ip/3260288d-1180-4f25-980c-7e6bbf1754ec/IMG_1945.jpeg'
        'https://img1.wsimg.com/isteam/ip/3260288d-1180-4f25-980c-7e6bbf1754ec/IMG_2865.jpeg'
        'https://img1.wsimg.com/isteam/ip/3260288d-1180-4f25-980c-7e6bbf1754ec/IMG_2447.jpeg'
        'https://img1.wsimg.com/isteam/ip/3260288d-1180-4f25-980c-7e6bbf1754ec/RenderedImage.jpeg'
        'https://img1.wsimg.com/isteam/ip/3260288d-1180-4f25-980c-7e6bbf1754ec/IMG_3001.jpeg'
        'https://img1.wsimg.com/isteam/ip/3260288d-1180-4f25-980c-7e6bbf1754ec/IMG_1051.jpeg'
        'https://img1.wsimg.com/isteam/ip/3260288d-1180-4f25-980c-7e6bbf1754ec/IMG_1037.jpeg'
        'https://img1.wsimg.com/isteam/ip/3260288d-1180-4f25-980c-7e6bbf1754ec/2047%20V4.jpeg'
        'https://img1.wsimg.com/isteam/ip/3260288d-1180-4f25-980c-7e6bbf1754ec/IMG_1940.jpeg'
        'https://img1.wsimg.com/isteam/ip/3260288d-1180-4f25-980c-7e6bbf1754ec/IMG_8918.jpeg'
        'https://img1.wsimg.com/isteam/ip/3260288d-1180-4f25-980c-7e6bbf1754ec/IMG_8917.jpeg'
        'https://img1.wsimg.com/isteam/ip/3260288d-1180-4f25-980c-7e6bbf1754ec/IMG_8738.jpeg'
        'https://img1.wsimg.com/isteam/ip/3260288d-1180-4f25-980c-7e6bbf1754ec/IMG_8736.jpeg'
        'https://img1.wsimg.com/isteam/ip/3260288d-1180-4f25-980c-7e6bbf1754ec/IMG_8744.jpeg'
        'https://img1.wsimg.com/isteam/ip/3260288d-1180-4f25-980c-7e6bbf1754ec/IMG_8748.jpeg'
        'https://img1.wsimg.com/isteam/ip/3260288d-1180-4f25-980c-7e6bbf1754ec/IMG_8757.jpeg'
        'https://img1.wsimg.com/isteam/ip/3260288d-1180-4f25-980c-7e6bbf1754ec/IMG_8739.jpeg'
        'https://img1.wsimg.com/isteam/ip/3260288d-1180-4f25-980c-7e6bbf1754ec/IMG_8758.jpeg'
        'https://img1.wsimg.com/isteam/ip/3260288d-1180-4f25-980c-7e6bbf1754ec/IMG_8740.jpeg'
        'https://img1.wsimg.com/isteam/ip/3260288d-1180-4f25-980c-7e6bbf1754ec/IMG_8761.jpeg'
        'https://img1.wsimg.com/isteam/ip/3260288d-1180-4f25-980c-7e6bbf1754ec/IMG_8777.jpeg'
        'https://img1.wsimg.com/isteam/ip/3260288d-1180-4f25-980c-7e6bbf1754ec/IMG_8745.jpeg'
        'https://img1.wsimg.com/isteam/ip/3260288d-1180-4f25-980c-7e6bbf1754ec/IMG_8782.jpeg'
        'https://img1.wsimg.com/isteam/ip/3260288d-1180-4f25-980c-7e6bbf1754ec/IMG_8771.jpeg'
        'https://img1.wsimg.com/isteam/ip/3260288d-1180-4f25-980c-7e6bbf1754ec/IMG_8772.jpeg'
        'https://img1.wsimg.com/isteam/ip/3260288d-1180-4f25-980c-7e6bbf1754ec/IMG_0389.jpeg'
        'https://img1.wsimg.com/isteam/ip/3260288d-1180-4f25-980c-7e6bbf1754ec/IMG_0090.jpeg'
        'https://img1.wsimg.com/isteam/ip/3260288d-1180-4f25-980c-7e6bbf1754ec/IMG_0092.jpeg'
    )
    'villa-lana' = @(
        'https://img1.wsimg.com/isteam/ip/3260288d-1180-4f25-980c-7e6bbf1754ec/phonto-6edd633.jpeg'
        'https://img1.wsimg.com/isteam/ip/3260288d-1180-4f25-980c-7e6bbf1754ec/IMG_5108.jpeg'
        'https://img1.wsimg.com/isteam/ip/3260288d-1180-4f25-980c-7e6bbf1754ec/IMG_5103.jpeg'
        'https://img1.wsimg.com/isteam/ip/3260288d-1180-4f25-980c-7e6bbf1754ec/phonto-665a7a5.jpeg'
        'https://img1.wsimg.com/isteam/ip/3260288d-1180-4f25-980c-7e6bbf1754ec/IMG_5106.jpeg'
        'https://img1.wsimg.com/isteam/ip/3260288d-1180-4f25-980c-7e6bbf1754ec/phonto-238dfa0.jpeg'
    )
    'villa-ivory' = @(
        'https://img1.wsimg.com/isteam/ip/3260288d-1180-4f25-980c-7e6bbf1754ec/phonto-54b9166.jpeg'
        'https://img1.wsimg.com/isteam/ip/3260288d-1180-4f25-980c-7e6bbf1754ec/IMG_0420-ff16e9c.jpeg'
        'https://img1.wsimg.com/isteam/ip/3260288d-1180-4f25-980c-7e6bbf1754ec/IMG_3820-411bad7.jpeg'
        'https://img1.wsimg.com/isteam/ip/3260288d-1180-4f25-980c-7e6bbf1754ec/IMG_4640-c6c5308.webp'
        'https://img1.wsimg.com/isteam/ip/3260288d-1180-4f25-980c-7e6bbf1754ec/IMG_0421.jpeg'
        'https://img1.wsimg.com/isteam/ip/3260288d-1180-4f25-980c-7e6bbf1754ec/IMG_0425.jpeg'
        'https://img1.wsimg.com/isteam/ip/3260288d-1180-4f25-980c-7e6bbf1754ec/IMG_0424.jpeg'
        'https://img1.wsimg.com/isteam/ip/3260288d-1180-4f25-980c-7e6bbf1754ec/IMG_0420-fe7c625.jpeg'
        'https://img1.wsimg.com/isteam/ip/3260288d-1180-4f25-980c-7e6bbf1754ec/IMG_2877.png'
        'https://img1.wsimg.com/isteam/ip/3260288d-1180-4f25-980c-7e6bbf1754ec/phonto-b5e5be3.jpeg'
        'https://img1.wsimg.com/isteam/ip/3260288d-1180-4f25-980c-7e6bbf1754ec/AB1A2C1D-10C9-4030-9C99-EB234D157AE8.jpeg'
        'https://img1.wsimg.com/isteam/ip/3260288d-1180-4f25-980c-7e6bbf1754ec/IMG_1727.jpeg'
        'https://img1.wsimg.com/isteam/ip/3260288d-1180-4f25-980c-7e6bbf1754ec/IMG_1730.jpeg'
        'https://img1.wsimg.com/isteam/ip/3260288d-1180-4f25-980c-7e6bbf1754ec/IMG_1731.jpeg'
        'https://img1.wsimg.com/isteam/ip/3260288d-1180-4f25-980c-7e6bbf1754ec/IMG_1729.jpeg'
        'https://img1.wsimg.com/isteam/ip/3260288d-1180-4f25-980c-7e6bbf1754ec/IMG_1728.jpeg'
        'https://img1.wsimg.com/isteam/ip/3260288d-1180-4f25-980c-7e6bbf1754ec/phonto-c6d9848.jpeg'
        'https://img1.wsimg.com/isteam/ip/3260288d-1180-4f25-980c-7e6bbf1754ec/IMG_9916.jpeg'
        'https://img1.wsimg.com/isteam/ip/3260288d-1180-4f25-980c-7e6bbf1754ec/IMG_9917.jpeg'
        'https://img1.wsimg.com/isteam/ip/3260288d-1180-4f25-980c-7e6bbf1754ec/IMG_9915.jpeg'
        'https://img1.wsimg.com/isteam/ip/3260288d-1180-4f25-980c-7e6bbf1754ec/IMG_9913.jpeg'
        "https://img1.wsimg.com/isteam/ip/3260288d-1180-4f25-980c-7e6bbf1754ec/45'%20single%20story%20house.rvt.jpeg"
        "https://img1.wsimg.com/isteam/ip/3260288d-1180-4f25-980c-7e6bbf1754ec/45'%20single%20story%20house.rvt%20(3).jpeg"
        "https://img1.wsimg.com/isteam/ip/3260288d-1180-4f25-980c-7e6bbf1754ec/45'%20single%20story%20house.rvt%20(5).jpeg"
        "https://img1.wsimg.com/isteam/ip/3260288d-1180-4f25-980c-7e6bbf1754ec/45'%20single%20story%20house.rvt%20(4).jpeg"
        "https://img1.wsimg.com/isteam/ip/3260288d-1180-4f25-980c-7e6bbf1754ec/45'%20single%20story%20house.rvt%20(2).jpeg"
        'https://img1.wsimg.com/isteam/ip/3260288d-1180-4f25-980c-7e6bbf1754ec/IMG_4253.jpeg'
        'https://img1.wsimg.com/isteam/ip/3260288d-1180-4f25-980c-7e6bbf1754ec/IMG_4248.jpeg'
        "https://img1.wsimg.com/isteam/ip/3260288d-1180-4f25-980c-7e6bbf1754ec/45'%20single%20story%20house.rvt%20(4)-4cf971f.jpeg"
        "https://img1.wsimg.com/isteam/ip/3260288d-1180-4f25-980c-7e6bbf1754ec/45'%20single%20story%20house.rvt%20(3)-0f4b7d5.jpeg"
        "https://img1.wsimg.com/isteam/ip/3260288d-1180-4f25-980c-7e6bbf1754ec/45'%20single%20story%20house.rvt-357f0c6.jpeg"
        "https://img1.wsimg.com/isteam/ip/3260288d-1180-4f25-980c-7e6bbf1754ec/45'%20single%20story%20house.rvt%20(5)-f94478e.jpeg"
        "https://img1.wsimg.com/isteam/ip/3260288d-1180-4f25-980c-7e6bbf1754ec/45'%20single%20story%20house.rvt%20(2)-93ac5ae.jpeg"
    )
    'villa-nia' = @(
        'https://img1.wsimg.com/isteam/ip/3260288d-1180-4f25-980c-7e6bbf1754ec/phonto-70f1343.jpeg'
        'https://img1.wsimg.com/isteam/ip/3260288d-1180-4f25-980c-7e6bbf1754ec/IMG_5420.jpeg'
        'https://img1.wsimg.com/isteam/ip/3260288d-1180-4f25-980c-7e6bbf1754ec/IMG_5418.jpeg'
        'https://img1.wsimg.com/isteam/ip/3260288d-1180-4f25-980c-7e6bbf1754ec/IMG_5422.jpeg'
        'https://img1.wsimg.com/isteam/ip/3260288d-1180-4f25-980c-7e6bbf1754ec/IMG_5421.jpeg'
        'https://img1.wsimg.com/isteam/ip/3260288d-1180-4f25-980c-7e6bbf1754ec/IMG_5419.jpeg'
        'https://img1.wsimg.com/isteam/ip/3260288d-1180-4f25-980c-7e6bbf1754ec/IMG_0880.jpeg'
        'https://img1.wsimg.com/isteam/ip/3260288d-1180-4f25-980c-7e6bbf1754ec/IMG_0212.jpeg'
    )
    'villa-spectra' = @(
        'https://img1.wsimg.com/isteam/ip/3260288d-1180-4f25-980c-7e6bbf1754ec/phonto-917ee1c.jpeg'
        'https://img1.wsimg.com/isteam/ip/3260288d-1180-4f25-980c-7e6bbf1754ec/IMG_5294.jpeg'
        'https://img1.wsimg.com/isteam/ip/3260288d-1180-4f25-980c-7e6bbf1754ec/IMG_5295.jpeg'
        'https://img1.wsimg.com/isteam/ip/3260288d-1180-4f25-980c-7e6bbf1754ec/IMG_5297.jpeg'
        'https://img1.wsimg.com/isteam/ip/3260288d-1180-4f25-980c-7e6bbf1754ec/IMG_5296.jpeg'
        'https://img1.wsimg.com/isteam/ip/3260288d-1180-4f25-980c-7e6bbf1754ec/IMG_5298.jpeg'
    )
}

# Classification function
function Get-ImageCategory {
    param([string]$filename)
    $lower = $filename.ToLower()
    # 3D Revit renders
    if ($lower -match '\.rvt' -or $lower -match 'renderedimage' -or $lower -match '2047.*v4') {
        return '3d'
    }
    # 2D floor maps (filenames containing plan/map/floor indicators)
    if ($lower -match 'floor.?plan' -or $lower -match 'floor.?map' -or $lower -match '\b2d\b') {
        return '2d'
    }
    # Everything else -> gallery
    return 'gallery'
}

$totalDownloaded = 0
$totalSkipped = 0
$totalFailed = 0

foreach ($slug in $plans.Keys) {
    $urls = $plans[$slug]
    $planDir = Join-Path $base $slug

    # Ensure folder structure
    $galleryDir = Join-Path $planDir 'gallery'
    $floorMap2d = Join-Path $planDir 'floor-map' '2d'
    $floorMap3d = Join-Path $planDir 'floor-map' '3d'
    foreach ($d in @($galleryDir, $floorMap2d, $floorMap3d)) {
        if (-not (Test-Path $d)) { New-Item -ItemType Directory -Path $d -Force | Out-Null }
    }

    Write-Host "`n=== $slug === ($($urls.Count) images)" -ForegroundColor Cyan
    $idx = 0

    foreach ($url in $urls) {
        $idx++
        # Extract filename from URL (decode percent-encoding)
        $urlPath = ([Uri]$url).AbsolutePath
        $segments = $urlPath -split '/'
        $rawFilename = $segments[-1]
        $filename = [Uri]::UnescapeDataString($rawFilename)
        # Clean filename for filesystem
        $filename = $filename -replace "['\(\)]", '' -replace '\s+', '-'

        # Classify
        $category = Get-ImageCategory $filename
        switch ($category) {
            '3d'      { $destDir = $floorMap3d }
            '2d'      { $destDir = $floorMap2d }
            default   { $destDir = $galleryDir }
        }

        $destPath = Join-Path $destDir $filename

        # Skip if already exists
        if (Test-Path $destPath) {
            Write-Host "  [$idx] SKIP (exists): $filename -> $category" -ForegroundColor DarkGray
            $totalSkipped++
            continue
        }

        # Download at full quality (strip resize params by not appending them)
        $downloadUrl = $url
        try {
            Invoke-WebRequest -Uri $downloadUrl -OutFile $destPath -UseBasicParsing -TimeoutSec 30 | Out-Null
            $size = [math]::Round((Get-Item $destPath).Length / 1KB, 1)
            Write-Host "  [$idx] OK (${size}KB): $filename -> $category" -ForegroundColor Green
            $totalDownloaded++
        }
        catch {
            Write-Host "  [$idx] FAIL: $filename - $($_.Exception.Message)" -ForegroundColor Red
            $totalFailed++
        }
    }
}

Write-Host "`n=== DONE ===" -ForegroundColor Yellow
Write-Host "Downloaded: $totalDownloaded | Skipped: $totalSkipped | Failed: $totalFailed"
