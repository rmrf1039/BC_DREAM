const sportNameTranslation = (name) => {
  switch(name) {
    case 'bicep_curl': {
      return '二頭彎舉'
    }

    case 'push_up': {
      return '俯臥撐'
    }

    case 'squat': {
      return '深蹲'
    }

    default: {
      return '未知運動'
    }
  }
}

const thingsTranslation = (name) => {
  switch(name) {
    case 'dumbbell': {
      return '啞鈴'
    }

    case 'protein': {
      return '蛋白粉'
    }

    case 'energy_drink': {
      return '能量飲料'
    }

    default: {
      return '未使用補給品'
    }
  }
};

export { sportNameTranslation, thingsTranslation };