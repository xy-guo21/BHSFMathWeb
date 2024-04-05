interface Option {
    value: string | number;
    label: string;
    children?: Option[];
  }
  
const SCHOOL_OPTIONS: Option[] = [
    {
      value: 'primary',
      label: '小学',
      children: [
        {
          value: 'huangchenggen',
          label: '黄城根小学',
        },
      ],
    },
    {
      value: 'juniorhigh',
      label: '初中',
      children: [
        {
          value: 'bhsf',
          label: '北京四中（初中部）',
        },
        {
          value: 'sdsz',
          label: '北师大附属实验中学（初中部）',
        },
        {
          value: 'sanfan',
          label: '三帆中学',
        },
        {
          value: '8ms',
          label: '北京八中（初中部）',
        },
        {
          value: 'bj13zfx',
          label: '北京十三中分校',
        },
      ],
    },
    {
      value: 'seniorhigh',
      label: '高中',
      children: [
        {
          value: 'bhsf',
          label: '北京四中（高中部）',
        },
        {
          value: 'sdsz',
          label: '北师大附属实验中学（高中部）',
        },
        {
          value: 'shsbnu',
          label: '北师大二附',
        },
        {
          value: '8ms',
          label: '北京八中（高中部）',
        },
      ],
    },
  ];

export {SCHOOL_OPTIONS}