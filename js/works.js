// ============ ================ ロード画面
$(window).on('load',function(){
    $("#splash-logo").delay(0).fadeOut('slow');
    $("#splash").delay(0).fadeOut('slow',function(){
    $('body').addClass('appear');
    });
    // ============ ＝＝＝ 画面遷移後
    $('.splashbg').on('animationend', function() { 
        // ============ メニューボタン
        $(".header-open").click(function(){
            $(this).toggleClass('active');
            $("#header-nav").toggleClass('panelactive');
        });
        // ============ メニューボタン/ナビゲーション
        $("#header-nav a").click(function(){
            $("header-open").removeClass('active');
            $("header-nav").removeClass('panelactive');
        });

        // ============ Muuriの初期化とフィルタリング
        const grid = new Muuri('.gallery-grid', {
            items: '.muuri-item',
            dragEnabled: true
        });

        const filterButtons = document.querySelectorAll('.filter-btn');

        filterButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                // アクティブボタンの切り替え
                document.querySelector('.filter-btn.active').classList.remove('active');
                e.target.classList.add('active');

                // フィルター条件の取得 (例: ".nature" または "*" )
                const filterValue = e.target.getAttribute('data-filter');

                // Muuriのfilterメソッドで絞り込み
                grid.filter(item => {
                    if (filterValue === '*') {
                        return true;
                    }
                    return item.getElement().classList.contains(filterValue.substring(1));
                });
            });
        });

        // ウィンドウサイズが変更されたときにレイアウトを再計算
        window.addEventListener('resize', () => {
            grid.refreshItems();
            grid.layout();
        });

        // ============ モーダルウィンドウの開閉
        $(function(){
            // 開くボタンをクリック
            $('.js-modal-open').on('click', function(){
                var target = $(this).data('target');
                $('#' + target).fadeIn();
                return false;
            });


        //     // 閉じるボタンまたは背景をクリック
            $('.js-modal-close').on('click', function(){
                $('.js-modal').fadeOut();
                return false;
            });

        });
    });
});